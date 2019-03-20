//== Languages Availables
const languagesAvailables = Array(
    { 
        label: "English",
        code:  "en"
    },
    { 
        label: "Francais",
        code:  "fr"
    }
);

languageData.menus.forEach(function(menuData){
    var menuItem = new MenuItem(menuData);
    menuItem.draw();
})