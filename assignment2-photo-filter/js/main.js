// Enter your JavaScript for the solution here...
window.addEventListener("load", function(e) {
  // DOM Reference Variables
  const tagsArray = Array.from(document.querySelectorAll(".thumb-display"));
  const query = document.querySelector("#filter");

  // reset button & event listener event handler
  const resetButton = document.querySelector("a.reset");
  resetButton.addEventListener("click", resetThumbnails, true);


  /* 
*
*
   INPUT EVENT HANDLER
   searchString =  the value of the input string
   -  if statement TRUE BLOCK
       .. checks the value of the searchString
       .. if the searchString isn't empty the call the filter function and send it the search string..
-    if statement false block
       .. call the resetThumbnails function
*
*
*/
  query.addEventListener("input", function(e) {
    let searchString = e.target.value.trim();

    if (searchString !== "") {
      filterItems(searchString);
      resetButton.classList.remove("hidden");
    } else {
      resetThumbnails();
    }
  });

  /* 
 FILTER FUNCTION
   
   ** loop through the tagsArray.
   ** extract tag text from the paragraph element.
   ** check to see if the tag text contains the query from the field.
   ** if the query is -1 meaning it can find a match for the query hide the tag item
   ** else show the class
*/
     const filterItems = query => {
      tagsArray.map(tag => {
        const tagText = tag.querySelector("p").textContent;
        if(tagText.indexOf(query) !== -1){
          tag.classList.remove("hidden");
        }else{
          tag.classList.add("hidden");
        }
      });
    };

  /* 
 ResetThumbnaitls
  Reset functionality for when the reset button is clicked
  or when the search field is empty.
*/
  function resetThumbnails() {
    query.value = "";
    resetButton.classList.add("hidden");
    tagsArray.forEach(thumb => {
      thumb.classList.remove("hidden");
    });
  }
});
