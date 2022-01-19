const SELECTORS = {
    themeSelectBtn: '.js-themepicker-themeselect'
}
const CLASSES = {
    active: 'selected'
}
const THEME_STORAGE_KEY = 'theme'

class ThemePicker {
    constructor() {
        this.activeTheme = 'light'
        this.hasLocalStorage = typeof Storage !== 'undefined'
        this.hasThemeColorMeta =
            !!document.querySelector('meta[name="theme-color"]') &&
            window.metaColors

        this.themeSelectBtns = Array.from(
            document.querySelectorAll(SELECTORS.themeSelectBtn)
        )

        this.init()
    }

    init() {
        const systemPreference = this.getSystemPreference()
        const storedPreference = this.getStoredPreference()

        if (storedPreference) {
            this.activeTheme = storedPreference
        } else if (systemPreference) {
            this.activeTheme = systemPreference
        }

        this.setActiveItem()
        this.bindEvents()
    }

    bindEvents() {
        this.themeSelectBtns.forEach((btn) => {
            const id = btn.dataset.themer

            if (id) {
                btn.addEventListener('click', () => this.setTheme(id))
            }
        })
    }

    getSystemPreference() {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark'
        }
        return false
    }

    getStoredPreference() {
        if (this.hasLocalStorage) {
            return localStorage.getItem(THEME_STORAGE_KEY)
        }
        return false
    }

    setActiveItem() {
        this.themeSelectBtns.forEach((btn) => {
            btn.classList.remove(CLASSES.active)
            btn.removeAttribute('aria-checked')

            if (btn.dataset.themer === this.activeTheme) {
                btn.classList.add(CLASSES.active)
                btn.setAttribute('aria-checked', 'true')
            }
        })
    }

    setTheme(id) {
        this.activeTheme = id
        document.documentElement.setAttribute('data-theme', id)

        if (this.hasLocalStorage) {
            localStorage.setItem(THEME_STORAGE_KEY, id)
        }

        this.setActiveItem()
    }
}

if (window.CSS && CSS.supports('color', 'var(--fake)')) {
    new ThemePicker()
}