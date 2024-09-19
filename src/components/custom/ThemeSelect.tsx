import { component$ } from "@builder.io/qwik";
import { themes } from '../../utils/constant';
import type { ThemeSelectProps } from '../../utils/type';

const ThemeSelect = component$<ThemeSelectProps>(({
    theme,
    handleThemeChange
}) => {
    return (
        <select class="select select-ghost absolute top-5 right-5"
            onChange$={(event: Event) => handleThemeChange((event.target as HTMLSelectElement).value)}
            value={theme}
        >
            <option disabled>Theme</option>
            {themes.map(themeItem => (
                <option key={themeItem} value={themeItem}
                    selected={themeItem === theme}
                >{themeItem}</option>
            ))}
        </select>
    )
});

export { ThemeSelect };