/* When the user clicks on the button, 
        toggle between hiding and showing the dropdown content */


const button = document.getElementById("myDropdown");

// Close the dropdown if the user clicks outside of it
button.addEventListener('click', e => {
//    if (!e.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
//    }
});
