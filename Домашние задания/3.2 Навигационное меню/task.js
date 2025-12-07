const mainMenus = document.querySelectorAll('.menu.menu_main');

mainMenus.forEach(mainMenu => {
    const menuLinks = mainMenu.querySelectorAll('.menu__link');

    menuLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            const parentItem = this.closest('.menu__item');
            if (!parentItem) return;

            const subMenu = parentItem.querySelector('.menu_sub');
            if (!subMenu) return;

            event.preventDefault();

            const activeSubMenus = mainMenu.querySelectorAll('.menu_sub.menu_active');
            activeSubMenus.forEach(menu => {
                if (menu !== subMenu) {
                    menu.classList.remove('menu_active');
                }
            });

            subMenu.classList.toggle('menu_active');
        });
    });
});