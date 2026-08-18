"use client";

import { useEffect, useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  ImagePlus,
  Link as LinkIcon,
  UploadCloud,
  X,
  Loader2,
  Sparkles,
  CheckCircle2,
  Layers,
  ChevronDown,
} from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { compressImageToWebP } from "@/lib/image-compress";
import type { OptionResult, SectionColor } from "@/lib/types";
import { SECTION_COLORS } from "@/lib/types";
import { useLang } from "@/lib/i18n";

const EMOJI_CHOICES = [
  "✨", "⭐", "🛒", "🏷️", "❤️", "🔥", "🆕",
  "🍫", "🍯", "☕", "🥫", "🐟", "🥟", "🧀",
  "🍵", "🍞", "🧴", "🎁", "🍕", "🍣", "🍎"
];

interface SuggestProductModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sectionId: string;
  sectionName: string;
  color?: SectionColor;
  editOption?: OptionResult | null;
  isSubmitting: boolean;
  onSubmit: (data: {
    sectionId: string;
    optionId?: string;
    name: string;
    description: string;
    emoji: string;
    imageUrl?: string;
  }) => void;
}

export function SuggestProductModal({
  open,
  onOpenChange,
  sectionId,
  sectionName,
  color = "rose",
  editOption,
  isSubmitting,
  onSubmit,
}: SuggestProductModalProps) {
  const { t } = useLang();
  const c = SECTION_COLORS[color] || SECTION_COLORS.rose;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [emoji, setEmoji] = useState("✨");
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [imageTab, setImageTab] = useState<"url" | "upload">("url");
  const [isCompressing, setIsCompressing] = useState(false);
  const [imageError, setImageError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      if (editOption) {
        setName(editOption.name || "");
        setDescription(editOption.description || "");
        setEmoji(editOption.emoji || "✨");
        setImageUrl(editOption.imageUrl || "");
        setImageTab(editOption.imageUrl?.startsWith("data:") ? "upload" : "url");
      } else {
        setName("");
        setDescription("");
        setEmoji("✨");
        setImageUrl("");
        setImageTab("url");
      }
      setImageError(null);
    }
  }, [open, editOption]);

  async function handleFileUpload(file: File) {
    if (!file) return;
    setImageError(null);
    setIsCompressing(true);
    try {
      const compressedDataUrl = await compressImageToWebP(file, 400, 400, 0.82);
      setImageUrl(compressedDataUrl);
    } catch (err) {
      setImageError(err instanceof Error ? err.message : "Failed to process image.");
    } finally {
      setIsCompressing(false);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmedName = name.trim();
    if (!trimmedName || isSubmitting || isCompressing) return;

    onSubmit({
      sectionId,
      optionId: editOption?.id,
      name: trimmedName,
      description: description.trim(),
      emoji,
      imageUrl: imageUrl.trim() || undefined,
    });
  }

  const isEditing = !!editOption;

  return (
    <Dialog open={open} onOpenChange={(v) => !isSubmitting && onOpenChange(v)}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto p-5 sm:p-6 gap-5">
        <DialogHeader className="gap-1.5 text-left">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className={cn("px-2 py-0.5 text-xs font-semibold gap-1", c.bg, c.text, c.border)}>
              <Layers className="size-3.5" />
              {sectionName}
            </Badge>
          </div>
          <DialogTitle className="text-lg sm:text-xl font-bold tracking-tight">
            {isEditing ? t.modalEditProductTitle : t.modalSuggestProductTitle}
          </DialogTitle>
          <DialogDescription className="text-xs sm:text-sm text-muted-foreground">
            {t.modalSuggestProductDesc}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground flex items-center justify-between">
              <span>{t.productTitleLabel} <span className="text-rose-500">*</span></span>
              <span className="text-[10px] text-muted-foreground font-normal">{name.length}/80</span>
            </label>
            <Input
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t.productTitlePlaceholder}
              maxLength={80}
              disabled={isSubmitting}
              className="h-10 text-sm"
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground flex items-center justify-between">
              <span>{t.productDescLabel}</span>
              <span className="text-[10px] text-muted-foreground font-normal">{description.length}/300</span>
            </label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={t.productDescPlaceholder}
              maxLength={300}
              rows={2}
              disabled={isSubmitting}
              className="text-xs sm:text-sm resize-none"
            />
          </div>

          {/* Smart Hybrid Image (URL or Upload) */}
          <div className="space-y-2 rounded-xl border border-border/80 bg-muted/20 p-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                <ImagePlus className="size-3.5 text-muted-foreground" />
                {t.productImageLabel}
              </label>
              {imageUrl && (
                <button
                  type="button"
                  onClick={() => setImageUrl("")}
                  className="text-[11px] font-medium text-rose-500 hover:text-rose-600 flex items-center gap-1"
                >
                  <X className="size-3" /> {t.removeImage}
                </button>
              )}
            </div>

            <Tabs value={imageTab} onValueChange={(v) => setImageTab(v as "url" | "upload")} className="w-full">
              <TabsList className="grid w-full grid-cols-2 h-8">
                <TabsTrigger value="url" className="text-xs gap-1.5">
                  <LinkIcon className="size-3" />
                  {t.imageUrlTab}
                </TabsTrigger>
                <TabsTrigger value="upload" className="text-xs gap-1.5">
                  <UploadCloud className="size-3" />
                  {t.imageUploadTab}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="url" className="mt-2.5 space-y-2">
                <Input
                  value={imageUrl.startsWith("data:") ? "" : imageUrl}
                  onChange={(e) => {
                    setImageUrl(e.target.value);
                    setImageError(null);
                  }}
                  placeholder="https://images.unsplash.com/... or web link"
                  disabled={isSubmitting}
                  className="h-9 text-xs sm:text-sm"
                />
              </TabsContent>

              <TabsContent value="upload" className="mt-2.5 space-y-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileUpload(file);
                  }}
                />

                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    const file = e.dataTransfer.files?.[0];
                    if (file) handleFileUpload(file);
                  }}
                  className="flex flex-col items-center justify-center gap-1.5 rounded-lg border border-dashed border-border/80 bg-background/50 p-4 text-center cursor-pointer transition-colors hover:bg-accent/50 hover:border-primary/50"
                >
                  {isCompressing ? (
                    <div className="flex items-center gap-2 text-xs text-muted-foreground py-2">
                      <Loader2 className="size-4 animate-spin text-primary" />
                      <span>{t.compressingImage}</span>
                    </div>
                  ) : (
                    <>
                      <UploadCloud className="size-6 text-muted-foreground" />
                      <div className="text-xs font-medium text-foreground">
                        {t.dropOrBrowse}
                      </div>
                      <p className="text-[10px] text-muted-foreground">
                        {t.autoWebPNote}
                      </p>
                    </>
                  )}
                </div>
              </TabsContent>
            </Tabs>

            {imageError && (
              <p className="text-[11px] text-rose-500 mt-1">{imageError}</p>
            )}

            {/* Live Image Preview */}
            {imageUrl && !isCompressing && (
              <div className="relative mt-2 flex items-center gap-3 rounded-lg border bg-background/80 p-2">
                <div className="relative size-14 shrink-0 overflow-hidden rounded-md border bg-muted/40">
                  <img
                    src={imageUrl}
                    alt="Preview"
                    className="h-full w-full object-cover"
                    onError={() => setImageError(t.imageLoadError)}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="size-3.5" />
                    {t.imageReady}
                  </span>
                  <p className="text-[10px] text-muted-foreground truncate">
                    {imageUrl.startsWith("data:") ? "Optimized WebP file" : imageUrl}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Emoji Badge Selector — Single-row Notion/Slack Style Popover */}
          <div className="flex items-center justify-between rounded-xl border border-border/80 bg-muted/20 px-3 py-2">
            <div className="space-y-0.5">
              <label className="text-xs font-semibold text-foreground">{t.productEmojiLabel}</label>
              <p className="text-[11px] text-muted-foreground">Used as badge & list marker</p>
            </div>

            <Popover open={isEmojiPickerOpen} onOpenChange={setIsEmojiPickerOpen}>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className={cn(
                    "flex items-center gap-2 rounded-lg border bg-background px-3 py-1.5 text-xs font-medium shadow-2xs transition-all hover:bg-accent",
                    c.border
                  )}
                >
                  <span className="text-base leading-none">{emoji}</span>
                  <span className="text-[11px] text-muted-foreground font-normal">Change</span>
                  <ChevronDown className="size-3 text-muted-foreground" />
                </button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-68 p-2.5 shadow-lg">
                <div className="text-[11px] font-semibold text-muted-foreground mb-2 px-1">Choose category icon</div>
                <div className="grid grid-cols-7 gap-1.5">
                  {EMOJI_CHOICES.map((e) => (
                    <button
                      key={e}
                      type="button"
                      onClick={() => {
                        setEmoji(e);
                        setIsEmojiPickerOpen(false);
                      }}
                      className={cn(
                        "flex size-8 items-center justify-center rounded-md border text-sm transition-transform hover:scale-110",
                        emoji === e
                          ? cn(c.border, c.bg, "ring-1 ring-offset-1 ring-offset-background", c.ring)
                          : "border-border/60 bg-muted/30 hover:bg-muted"
                      )}
                    >
                      {e}
                    </button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>

          <DialogFooter className="pt-2 sm:justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting || isCompressing}
            >
              {t.cancel}
            </Button>
            <Button
              type="submit"
              disabled={!name.trim() || isSubmitting || isCompressing}
              className={cn("gap-1.5 font-semibold", c.bar, "text-white hover:opacity-90")}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  {t.submitting}
                </>
              ) : (
                <>
                  <Sparkles className="size-4" />
                  {isEditing ? t.saveChanges : t.suggestProductSubmit}
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
