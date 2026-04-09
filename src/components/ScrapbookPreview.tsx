"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Smartphone,
  Trash2,
} from "lucide-react";

/* ══════════════════════════════════════════════════════════════
   SCRAPBOOK PREVIEW — Preview interativo do scrapbook
   - Paginas A5 landscape (210x148mm) com fundo preto
   - Fotos estilo Polaroid (gramatura 180g)
   - Drag & drop via Pointer Events (mouse + touch)
   - Tap-to-select + tap-to-place como fallback mobile
   - Forca orientacao landscape no mobile
   - Max 3 fotos por pagina
   ══════════════════════════════════════════════════════════════ */

export type PhotoPlacement = {
  photoIndex: number;
  x: number;
  y: number;
  rotation: number;
};

export type ScrapbookPage = {
  photos: PhotoPlacement[];
};

interface Props {
  previews: string[];
  photoCount: number;
  plan: "essencial" | "especial" | "premium";
  onFinalize: (pages: ScrapbookPage[]) => void;
  onBack: () => void;
}

const MAX_PER_PAGE = 3;

function getPageCount(plan: string): number {
  switch (plan) {
    case "essencial":
      return 5;
    case "especial":
      return 8;
    case "premium":
      return 12;
    default:
      return 5;
  }
}

export default function ScrapbookPreview({
  previews,
  photoCount,
  plan,
  onFinalize,
  onBack,
}: Props) {
  const pageCount = getPageCount(plan);

  const [pages, setPages] = useState<ScrapbookPage[]>(() =>
    Array.from({ length: pageCount }, () => ({ photos: [] }))
  );
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const [isPortrait, setIsPortrait] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Drag state
  const [dragState, setDragState] = useState<{
    photoIndex: number;
    x: number;
    y: number;
    source: "bank" | "page";
    pagePhotoIdx?: number;
  } | null>(null);

  const pageRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // All placed photos
  const placedPhotos = new Set<number>();
  pages.forEach((page) =>
    page.photos.forEach((p) => placedPhotos.add(p.photoIndex))
  );
  const placedCount = placedPhotos.size;

  // Available (unplaced) photos
  const availablePhotos = Array.from({ length: photoCount }, (_, i) => i).filter(
    (i) => !placedPhotos.has(i)
  );

  // Orientation detection
  useEffect(() => {
    const check = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setIsPortrait(mobile && window.innerHeight > window.innerWidth);
    };
    check();
    window.addEventListener("resize", check);
    window.addEventListener("orientationchange", check);
    return () => {
      window.removeEventListener("resize", check);
      window.removeEventListener("orientationchange", check);
    };
  }, []);

  // Try to lock landscape on mobile
  useEffect(() => {
    const so = screen.orientation as ScreenOrientation & {
      lock?: (orientation: string) => Promise<void>;
      unlock?: () => void;
    };
    if (so?.lock) {
      so.lock("landscape").catch(() => {});
    }
    return () => {
      if (so?.unlock) {
        try {
          so.unlock();
        } catch {}
      }
    };
  }, []);

  // Place photo on page
  const placePhoto = useCallback(
    (photoIndex: number, x: number, y: number) => {
      const page = pages[currentPage];
      if (page.photos.length >= MAX_PER_PAGE) return;
      if (placedPhotos.has(photoIndex)) return;

      const rotation = (Math.random() - 0.5) * 12;
      const clampedX = Math.max(15, Math.min(85, x));
      const clampedY = Math.max(15, Math.min(85, y));

      setPages((prev) => {
        const next = [...prev];
        next[currentPage] = {
          photos: [
            ...next[currentPage].photos,
            { photoIndex, x: clampedX, y: clampedY, rotation },
          ],
        };
        return next;
      });
      setSelectedPhoto(null);
    },
    [pages, currentPage, placedPhotos]
  );

  // Remove photo from page
  const removeFromPage = useCallback(
    (pageIdx: number, photoPlacementIdx: number) => {
      setPages((prev) => {
        const next = [...prev];
        next[pageIdx] = {
          photos: next[pageIdx].photos.filter((_, i) => i !== photoPlacementIdx),
        };
        return next;
      });
    },
    []
  );

  // --- POINTER EVENTS (unified mouse + touch) ---

  const handleBankPointerDown = useCallback(
    (e: React.PointerEvent, photoIndex: number) => {
      e.preventDefault();
      (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
      setDragState({
        photoIndex,
        x: e.clientX,
        y: e.clientY,
        source: "bank",
      });
      setSelectedPhoto(photoIndex);
    },
    []
  );

  const handlePlacedPointerDown = useCallback(
    (e: React.PointerEvent, pageIdx: number, photoPlacementIdx: number) => {
      e.preventDefault();
      e.stopPropagation();
      (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
      const placement = pages[pageIdx].photos[photoPlacementIdx];
      setDragState({
        photoIndex: placement.photoIndex,
        x: e.clientX,
        y: e.clientY,
        source: "page",
        pagePhotoIdx: photoPlacementIdx,
      });
      // Remove from page while dragging
      removeFromPage(pageIdx, photoPlacementIdx);
    },
    [pages, removeFromPage]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragState) return;
      e.preventDefault();
      setDragState((prev) =>
        prev ? { ...prev, x: e.clientX, y: e.clientY } : null
      );
    },
    [dragState]
  );

  const handlePointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (!dragState) return;
      e.preventDefault();

      const pageEl = pageRef.current;
      if (pageEl) {
        const rect = pageEl.getBoundingClientRect();
        const inPage =
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom;

        if (inPage && !placedPhotos.has(dragState.photoIndex)) {
          const x = ((e.clientX - rect.left) / rect.width) * 100;
          const y = ((e.clientY - rect.top) / rect.height) * 100;
          placePhoto(dragState.photoIndex, x, y);
        }
      }

      setDragState(null);
      setSelectedPhoto(null);
    },
    [dragState, placedPhotos, placePhoto]
  );

  // Tap-to-place on page (fallback / also works with drag)
  const handlePageClick = useCallback(
    (e: React.MouseEvent) => {
      if (dragState) return; // Handled by pointerUp
      if (selectedPhoto === null) return;
      if (!pageRef.current) return;
      if (pages[currentPage].photos.length >= MAX_PER_PAGE) return;

      const rect = pageRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      placePhoto(selectedPhoto, x, y);
    },
    [dragState, selectedPhoto, currentPage, pages, placePhoto]
  );

  // Navigation
  const prevPage = () => setCurrentPage((p) => Math.max(0, p - 1));
  const nextPage = () => setCurrentPage((p) => Math.min(pageCount - 1, p + 1));

  // --- PORTRAIT OVERLAY ---
  if (isPortrait) {
    return (
      <div className="fixed inset-0 z-[60] bg-dark flex flex-col items-center justify-center text-white p-8">
        <div className="relative w-20 h-32 border-2 border-white/40 rounded-xl mb-6">
          <Smartphone
            size={48}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/60"
          />
          <div className="absolute -right-8 top-1/2 -translate-y-1/2 animate-pulse">
            <RotateCcw size={24} className="text-rose" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-center mb-3">
          Vire o celular na horizontal
        </h2>
        <p className="text-white/60 text-center text-sm max-w-xs">
          Para personalizar seu scrapbook, precisamos da tela em modo paisagem.
        </p>
      </div>
    );
  }

  // --- MAIN RENDER ---
  const currentPageData = pages[currentPage];
  const pageIsFull = currentPageData.photos.length >= MAX_PER_PAGE;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[55] bg-neutral-950 flex flex-col select-none"
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      style={{ touchAction: "none" }}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-neutral-900 border-b border-white/10 shrink-0">
        <button
          onClick={onBack}
          className="text-white/60 hover:text-white text-sm flex items-center gap-1"
        >
          <ChevronLeft size={16} />
          Voltar
        </button>

        <div className="flex items-center gap-4">
          <span className="text-white/80 text-sm font-medium">
            Pagina {currentPage + 1} / {pageCount}
          </span>
          <span className="text-rose text-xs font-bold bg-rose/10 px-2 py-1 rounded">
            {placedCount}/{photoCount} fotos
          </span>
        </div>

        <button
          onClick={() => onFinalize(pages)}
          className="bg-green-500 text-white text-sm font-bold px-4 py-1.5 rounded-full hover:bg-green-600 transition-colors"
        >
          Finalizar
        </button>
      </div>

      {/* Main area */}
      <div className="flex-1 flex min-h-0">
        {/* Scrapbook page area */}
        <div className="flex-1 flex items-center justify-center p-2 sm:p-4 gap-2">
          {/* Prev page */}
          <button
            onClick={prevPage}
            disabled={currentPage === 0}
            className="text-white/40 hover:text-white disabled:text-white/10 transition-colors shrink-0"
          >
            <ChevronLeft size={28} />
          </button>

          {/* The scrapbook page — A5 landscape */}
          <div
            ref={pageRef}
            onClick={handlePageClick}
            className="relative bg-neutral-900 rounded-lg shadow-2xl border border-white/10 overflow-hidden"
            style={{
              aspectRatio: "210 / 148",
              maxHeight: "calc(100vh - 180px)",
              maxWidth: "min(100%, 750px)",
              width: "100%",
              cursor:
                selectedPhoto !== null && !pageIsFull ? "crosshair" : "default",
            }}
          >
            {/* Subtle paper texture */}
            <div className="absolute inset-0 bg-gradient-to-br from-neutral-800/30 via-transparent to-neutral-800/20 pointer-events-none" />

            {/* Binding line (left edge) */}
            <div className="absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-r from-black to-transparent pointer-events-none" />

            {/* Placed photos as Polaroids */}
            {currentPageData.photos.map((p, i) => (
              <div
                key={`${p.photoIndex}-${i}`}
                className="absolute cursor-grab active:cursor-grabbing group"
                style={{
                  left: `${p.x}%`,
                  top: `${p.y}%`,
                  transform: `translate(-50%, -50%) rotate(${p.rotation}deg)`,
                  zIndex: 10 + i,
                }}
                onPointerDown={(e) =>
                  handlePlacedPointerDown(e, currentPage, i)
                }
              >
                {/* Polaroid frame */}
                <div className="bg-white p-[3px] pb-5 sm:p-1.5 sm:pb-7 shadow-xl rounded-[2px] transition-transform hover:scale-105">
                  <img
                    src={previews[p.photoIndex]}
                    alt=""
                    className="w-16 h-16 sm:w-24 sm:h-24 md:w-28 md:h-28 object-cover pointer-events-none"
                    draggable={false}
                  />
                  {/* Remove hint */}
                  <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full items-center justify-center text-white hidden group-hover:flex">
                    <Trash2 size={10} />
                  </div>
                </div>
              </div>
            ))}

            {/* Empty state */}
            {currentPageData.photos.length === 0 && (
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <p className="text-white/15 text-xs sm:text-sm text-center px-4">
                  {selectedPhoto !== null
                    ? "Toque aqui para posicionar a foto"
                    : "Selecione ou arraste uma foto da lista"}
                </p>
              </div>
            )}

            {/* Full indicator */}
            {pageIsFull && (
              <div className="absolute top-2 right-2 bg-rose/80 text-white text-[10px] px-2 py-0.5 rounded-full pointer-events-none">
                Pagina cheia
              </div>
            )}
          </div>

          {/* Next page */}
          <button
            onClick={nextPage}
            disabled={currentPage === pageCount - 1}
            className="text-white/40 hover:text-white disabled:text-white/10 transition-colors shrink-0"
          >
            <ChevronRight size={28} />
          </button>
        </div>

        {/* Photo bank (sidebar on desktop, bottom on mobile) */}
        <div className="w-24 sm:w-32 bg-neutral-900 border-l border-white/10 flex flex-col shrink-0">
          <div className="px-2 py-2 border-b border-white/10">
            <p className="text-white/40 text-[10px] sm:text-xs leading-tight">
              {selectedPhoto !== null
                ? "Toque na pagina"
                : "Selecione ou arraste"}
            </p>
          </div>

          <div className="flex-1 overflow-y-auto p-1.5 sm:p-2">
            <div className="grid grid-cols-2 gap-1.5">
              {availablePhotos.map((i) => (
                <div
                  key={i}
                  onPointerDown={(e) => handleBankPointerDown(e, i)}
                  onClick={() =>
                    setSelectedPhoto(selectedPhoto === i ? null : i)
                  }
                  className={`relative aspect-square rounded overflow-hidden cursor-grab active:cursor-grabbing transition-all ${
                    selectedPhoto === i
                      ? "ring-2 ring-rose scale-105 shadow-lg shadow-rose/30"
                      : "opacity-70 hover:opacity-100"
                  }`}
                  style={{ touchAction: "none" }}
                >
                  <img
                    src={previews[i]}
                    alt=""
                    className="w-full h-full object-cover pointer-events-none"
                    draggable={false}
                  />
                  <span className="absolute bottom-0 right-0 bg-black/60 text-white text-[8px] px-1">
                    {i + 1}
                  </span>
                </div>
              ))}

              {availablePhotos.length === 0 && (
                <p className="col-span-2 text-rose text-[10px] text-center py-4">
                  Todas posicionadas!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar — page dots + info */}
      <div className="flex items-center justify-between px-4 py-2 bg-neutral-900 border-t border-white/10 shrink-0">
        <div className="flex gap-1">
          {Array.from({ length: pageCount }).map((_, i) => {
            const hasPhotos = pages[i].photos.length > 0;
            return (
              <button
                key={i}
                onClick={() => setCurrentPage(i)}
                className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all ${
                  i === currentPage
                    ? "bg-rose scale-125"
                    : hasPhotos
                      ? "bg-white/40"
                      : "bg-white/15"
                }`}
              />
            );
          })}
        </div>

        <p className="text-white/30 text-[10px] sm:text-xs">
          Toque na foto posicionada para remover · Max {MAX_PER_PAGE} por pagina
        </p>
      </div>

      {/* Floating drag photo */}
      {dragState && (
        <div
          className="fixed pointer-events-none z-[70]"
          style={{
            left: dragState.x - 36,
            top: dragState.y - 36,
          }}
        >
          <div className="bg-white p-1 pb-4 shadow-2xl rounded-[2px] opacity-80 rotate-3">
            <img
              src={previews[dragState.photoIndex]}
              alt=""
              className="w-16 h-16 object-cover"
              draggable={false}
            />
          </div>
        </div>
      )}
    </div>
  );
}
