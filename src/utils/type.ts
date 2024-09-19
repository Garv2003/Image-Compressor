import type { NoSerialize, QRL } from '@builder.io/qwik';

type ImageStore = { filename: string; originalImage: NoSerialize<File | null>; imageSrc: string; compressedImage: NoSerialize<File | null>; compressedImageUrl: string; compressionError: string; isEventListenerAdded: boolean; isCompress: boolean; isLoading: boolean; percentage: number };

interface CompressImageProps {
    compressedImage: any;
    compressedImageUrl: string;
    originalImage: any;
    percentage: number;
    handleClearImage: QRL<() => void>;
}

interface ImagePreviewProps {
    filename: string;
    imageSrc: string;
    originalImage: any;
    compressImage: QRL<() => void>;
    handleClearImage: QRL<() => void>;
}

interface InputImageProps {
    handleImageUpload: QRL<(event: Event) => void>;
}

type ThemeSelectProps = {
    theme: string;
    handleThemeChange: QRL<(currentTheme: string) => void>;
};


export type { ImageStore, CompressImageProps, ImagePreviewProps, InputImageProps, ThemeSelectProps };