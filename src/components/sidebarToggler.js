export const sidebarToggler = () => {

    const sideNav = document.getElementById('side-nav');
    const sideNavBackdrop = document.querySelector('.side-nav__backdrop');
    const menuBtn = document.getElementById('menu-btn');
    const closeBtn = document.getElementById('close-btn');
    
    function toggleSideNav(){
        sideNav?.style.setProperty('transform', 'translateX(0)');
        sideNavBackdrop?.style.setProperty('display', 'block');
    }
    
    function collapseNav(){
        sideNav?.style.setProperty('transform', 'translateX(-320px)');
        sideNavBackdrop?.style.setProperty('display', 'none');
    }
    
    menuBtn?.addEventListener('click', toggleSideNav);
    closeBtn?.addEventListener('click', collapseNav);
    
    sideNavBackdrop?.addEventListener('click', () =>{
        if(sideNavBackdrop){
            collapseNav();
        }
    })
}
