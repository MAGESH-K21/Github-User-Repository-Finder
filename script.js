import { Octokit } from "https://cdn.skypack.dev/@octokit/core";


const API_URL='https://api.github.com/users/'
const form=document.getElementById('form')
const search=document.getElementById('search')
const main=document.getElementById('main')


//getUser('bradtraversy')


async function getUser(username)
{
    try{
    const res =await axios.get(API_URL+username)

     createUserCard(res)
     getRepos(username)
    }
    catch(err){
        //if(err.response.status == 404)

       // {
            createErrorCard('Problem fetching repos')

           //console.log(err.response)
       // }
    }
   
}

async function getRepos(username)
{
    try{
        const res =await axios.get(API_URL+username+'/repos?sort=created')
    
         addReposToCard(username,res)
        }
        catch(err){
            //if(err.response.status == 404)
    
           // {
                createErrorCard('No Profile with this username')
               //console.log(err.response)
           // }
        }
}


function createUserCard(user){
    const cardHTML=`<div class="card">
    <div>
        <img src="${user.avatar_url}" class="avatar">
    </div>
    <div class="user-info">
        <h2>${user.name===null?user.login:user.name}</h2>
        <p>${user.bio==null?'':user.bio}</p>
        <ul>
            <li>${user.followers} &nbsp;Followers</li>
            <li>${user.following} &nbsp;Following</li>
            <li>${user.public_repos} &nbsp;Repos</li>
        </ul>
          
        <div id="repos">
            
        </div>
    </div>
</div>
`
main.innerHTML=cardHTML
}

function createErrorCard(msg)
{
    const cardHTML=`
    <div class="card">
    <h1>${msg}</h1>
    </div>
    `
    main.innerHTML=cardHTML
}

function addReposToCard(username,repos)
{
    const reposEl=document.getElementById('repos')
    repos.forEach(repo=>{
        const repoEl=document.createElement('a')
        repoEl.classList.add('repo')
        repoEl.href=tool(username,repo.name)
        repoEl.target='_self';
        repoEl.innerText=repo.name;
        reposEl.appendChild(repoEl)
        
    })
}

form.addEventListener('submit',(e)=>{
    e.preventDefault()
    const user= search.value
    if(user){
        getUser(user)
        search.value=''
    }
})

async function tool(username,repos){

    const octokit = new Octokit({
        auth: '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'
      })
    const response= await octokit.request('GET /repos/{owner}/{repo}/stats/participation', {
        owner: username,
        repo: repos
      })
    graph(response.data.all.slice(0,10)) 
}
async function graph(response)
var xValues = ["Italy", "France", "Spain", "USA", "Argentina"];
response.forEach(r=>{
    var yValues = [55, 49, 44, 24, 15];
    var barColors = ["red", "green","blue","orange","brown"];

new Chart("myChart", {
  type: "bar",
  data: {
    labels: xValues,
    datasets: [{
      backgroundColor: barColors,
      data: yValues
    }]
  },
  options: {
    legend: {display: false},
    title: {
      display: true,
      text: "World Wine Production 2018"
    }
  }
});
}

)


