/* I created scorename and scorelist separately for the ease of sorting */

function sortList() {
  var scorename, scorelist, i, switching, b, shouldSwitch;
  scorename = document.getElementById("scorename");
  scorelist = document.getElementById("scorelist");
  switching = true;

  while (switching) {
    switching = false;
    a = scorename.getElementsByTagName("li");
    b = scorelist.getElementsByTagName("li");
    // Loop through all list-items:
    for (i = 0; i < (b.length - 1); i++) {
      shouldSwitch = false;
      /* check if the next item should
      switch place with the current item */
      if (Number(b[i].innerHTML) < Number(b[i + 1].innerHTML)) {
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      /* If a switch has been marked, make the switch
      and mark the switch as done */
      b[i].parentNode.insertBefore(b[i+1], b[i]);
      a[i].parentNode.insertBefore(a[i+1], a[i]);
      switching = true;
    }
  }
}

sortList();
