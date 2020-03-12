// Your code here...

//application scope
window.addEventListener("load", function(e){
    const homeLink = this.document.querySelector('.home')
    const friendLink = this.document.querySelector('.friends')
    const pageContent = this.document.querySelector('.content')
    let friendData = [];
    let friendUl = `
        <ul>
            <h2>FRIENDS</h2>
            <li>Jane Doe</li>
            <li>Tom Jones</li>
            <li>Clark Kent</li>
            <li>Sally Anne</li>
        </ul>
    `;

    function homeReset (){
        homeLink.addEventListener('click', function(e){
            const resetContent = "";
            pageContent.innerHTML = resetContent;
        })
    }

    let listFrag = this.document.createRange().createContextualFragment(friendUl)
    const listUl = listFrag.querySelector('ul')
    const friendSelector = listUl.querySelectorAll("li")

    function friendReset () {
        friendLink.addEventListener('click', function(e){
            pageContent.appendChild(listFrag)
        })
    }

    // fetch the data from JSON
    fetch('friends/friends.json').then
    (response => response.json()).then
    (data => {
      friendData = data;
      buildMarkup(data);
    })

    // Build the markup
    function buildMarkup(){
        let listItem = ``;
         friendData.forEach(friend=>{
            listItem += `
                <div class="${friend.firstName}" id="${friend.id}">
                    <img src="img/${friend.avatar}" class="photo" />
                    <h2 class="name">${friend.firstName} ${friend.lastName}</h2>
                    <ul>
                        <li><span class="label">email:</span> ${friend.email}</li>
                        <li><span class="label">hometown:</span> ${friend.hometown}</li>
                    </ul>
                    <p class="bio">
                        ${friend.bio}
                    </p> 
                </div>

            `
         })
        const list = `<div class="friend">${listItem}</div>`

        let fragment = document.createRange().createContextualFragment(list)
        friendList = fragment.querySelector('div');
        const links = friendList.querySelectorAll('div');

        friendReset();

        friendSelector.forEach((friend,index) =>{
            let counter = 0;
            friend.dataset.index = index;
            friend.addEventListener('click', function(e){
                // calls the for display friend function
                 if (e.target.dataset.index == counter) {
                    pageContent.innerHTML = ""; 
                    pageContent.appendChild(links[counter])
                 }
                 else {
                    if (e.target.dataset.index == counter) {
                        pageContent.innerHTML = ""; 
                        pageContent.appendChild(links[counter])
                    }
                    else {
                        counter++
                    }
                 }
            })
        })

        friendLink.addEventListener('click', friendReset(e));
        homeLink.addEventListener('click', homeReset(e));
    }

})
