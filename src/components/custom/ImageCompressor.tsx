import { $, component$, useStore, noSerialize, useTask$, useVisibleTask$ } from '@builder.io/qwik';
import type { NoSerialize } from '@builder.io/qwik';
import imageCompression from 'browser-image-compression';
import type { ImageStore } from '../../utils/type';
import { Spinner } from './Spinner';
import { CompressImage } from './CompressImage';
import { ImagePreview } from './ImagePreview';
import { InputImage } from './InputImage';
import { ThemeSelect } from './ThemeSelect';

export default component$(() => {
    const state = useStore<ImageStore>({
        filename: '',
        originalImage: null as unknown as NoSerialize<File | null>,
        imageSrc: '',
        compressedImage: null as unknown as NoSerialize<File | null>,
        compressedImageUrl: '',
        compressionError: '',
        isEventListenerAdded: false,
        isCompress: false,
        isLoading: false,
        percentage: 0,
    });

    const theme = useStore({ value: 'luxury' });

    const handleThemeChange = $((currentTheme: string) => {
        localStorage.setItem('theme', currentTheme);
        theme.value = currentTheme;
    });

    const calculatePercentage = $(() => {
        const originalSize = state.originalImage?.size || 0;
        const compressedSize = state.compressedImage?.size || 0;
        return ((originalSize - compressedSize) / originalSize) * 100;
    });

    const compressImage = $(async () => {
        state.isCompress = true;
        state.isLoading = true;
        try {
            const options = {
                maxSizeMB: 1,
                maxWidthOrHeight: 1920,
                useWebWorker: true,
            };

            if (state.originalImage) {
                const compressedImage = await imageCompression(state.originalImage, options);
                state.compressedImage = noSerialize(compressedImage);
                state.compressedImageUrl = URL.createObjectURL(compressedImage);
                state.percentage = await calculatePercentage();
            } else {
                console.log('No original image found');
            }
        } catch (error) {
            console.error('Error during image compression:', error);
            state.compressionError = error instanceof Error ? error.message : 'An unknown error occurred';
        }
        state.isLoading = false;
    });

    const handleImageUpload = $(async (event: Event) => {
        const input = event.target as HTMLInputElement;
        if (input.files?.[0]) {
            state.originalImage = noSerialize(input.files[0]);
            state.filename = input.files[0].name;
            state.imageSrc = URL.createObjectURL(input.files[0]);
            state.isEventListenerAdded = true;
        }
    });

    useVisibleTask$(() => {
        const theme = localStorage.getItem('theme');
        if (theme) {
            handleThemeChange(theme);
        }
    });

    const handleClearImage = $(() => {
        state.originalImage = null as unknown as NoSerialize<File | null>,
            state.imageSrc = '';
        state.filename = '';
        state.compressedImage = null as unknown as NoSerialize<File | null>,
            state.compressedImageUrl = '';
        state.compressionError = '';
        state.isCompress = false;
    });

    return (
        <div class="w-full min-h-screen flex flex-col justify-center items-center" data-theme={theme.value}>

            <ThemeSelect theme={theme.value} handleThemeChange={handleThemeChange} />

            <h1 class="text-5xl font-bold mb-6">Image Compressor</h1>

            {!state.isCompress && (
                state.imageSrc ? (
                    <ImagePreview filename={state.filename} imageSrc={state.imageSrc}
                        originalImage={state.originalImage} compressImage={compressImage}
                        handleClearImage={handleClearImage} />
                ) : (
                    <InputImage handleImageUpload={handleImageUpload} />
                )
            )}

            {state.isLoading && <Spinner />}

            {state.compressedImage && <CompressImage compressedImage={state.compressedImage}
                compressedImageUrl={state.compressedImageUrl} originalImage={state.originalImage}
                percentage={state.percentage} handleClearImage={handleClearImage} />}

            {state.compressionError && <p style={{ color: 'red' }}>{state.compressionError}</p>}
        </div>
    );
});