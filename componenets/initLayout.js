import { sidebarCollapse } from "./sidebar/sidebarCollapse.js"
import { initLogout } from "./logout/logout.js";

export function initLayout(){
    // Inject sidebar
    fetch('/components/sidebar.html')
    .then(res=>res.text())
    .then(html=>{
        const sidebarContainer=document.getElementById('sidebarContainer');
        if(sidebarContainer){
            sidebarContainer.innerHTML = html;
            // Recent Journeys Sidebar Collapse
            sidebarCollapse()
    }
});

    //Inject Logout Button
    fetch('/components/logout.html')
    .then (res=> res.text())
    .then (html=>{
        const logoutContainer = document.getElementById('logout-container');
        if (logoutContainer){
            logoutContainer.innerHTML = html;
            // Logout Function
            initLogout()
        }
    });
}