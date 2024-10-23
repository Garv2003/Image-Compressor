import { component$, $, } from '@builder.io/qwik';
import type { CompressImageProps } from '../../utils/type';

const CompressImage = component$<CompressImageProps>(({
    compressedImage,
    compressedImageUrl,
    originalImage,
    percentage,
    handleClearImage
}) => {

    const handleDownload = $(() => {
        if (compressedImage) {
            const downloadLink = document.createElement('a');
            downloadLink.href = compressedImageUrl;
            downloadLink.download = "compress_" + compressedImage.name;
            downloadLink.click();
        }
    });

    return (

        <div class="flex flex-col items-center">
            <div class="flex items-center justify-center gap-3 mb-3">
                <div
                    class="radial-progress border-4"
                    style={`--value:${percentage.toFixed(2)};`}
                    role="progressbar">
                    {percentage.toFixed(2)}%
                </div>

                <div class="flex flex-col items-center justify-center gap-1 mb-3">
                    <span
                        class="text-xl font-bold"
                    > Your image is compressed by {percentage.toFixed(2)}%</span>
                    <span class="font-bold text-sm">
                        {originalImage && (originalImage.size / 1024 / 1024).toFixed(2)} MB to {(compressedImage.size / 1024 / 1024).toFixed(2)} MB
                    </span>
                </div>
            </div>
            <img src={compressedImageUrl} alt="Compressed" width={500} height={300} />
            <div class="flex items-center justify-center gap-3">
                <button
                    class="btn btn-outline mt-2"
                    onClick$={handleDownload}
                >
                    Download
                </button>
                <button
                    onClick$={handleClearImage}
                    class="btn btn-outline mt-2"
                >
                    Clear
                </button>
            </div>
        </div >

    );
});

export { CompressImage };