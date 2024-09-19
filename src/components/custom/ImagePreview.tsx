import { component$ } from "@builder.io/qwik";
import type { ImagePreviewProps } from "../../utils/type";

const ImagePreview = component$<ImagePreviewProps>(({
    filename,
    imageSrc,
    originalImage,
    compressImage,
    handleClearImage
}) => {
    return (
        <>
            <img
                src={imageSrc}
                class="rounded-lg shadow-lg mb-4"
                alt="Image preview"
                width={500}
                height={300}
            />
            <div class="flex flex-col items-center justify-center mb-4 gap-2">
                <span id="filename" class="z-50">{filename}</span>
                <span id="filesize" class="z-50">
                    {originalImage && (originalImage.size / 1024 / 1024).toFixed(2)} MB
                </span>
            </div>

            <div class="flex items-center justify-center gap-2">
                <button class="btn btn-outline mt-2" onClick$={compressImage}>Compress Image</button>
                <button class="btn btn-outline mt-2" onClick$={handleClearImage}>Clear</button>
            </div>
        </>
    )
});

export { ImagePreview };