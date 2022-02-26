<script context="module">
  export async function load({ session, fetch }) {
    if (!session?.user) {
      return {
        status: 302,
        redirect: '/sign-in'
      };
    }
    const res = await fetch('/api/projects.json');
    let { projects } = await res.json();
    const protectedProjects = projects.reduce((filtered, item) => {
      if (item.isProtected) {
        filtered.push(item.shortTitle);
      }
      return filtered;
    }, []);
    return {
      props: {
        user: session.user,
        projects,
        protectedProjects
      }
    };
  }
</script>

<script>
  export let user;
  export let projects;
  export let protectedProjects;

  async function handleDeleteProject(project) {
    if (!confirm(`Do you really want to delete project ${project}`)) {
      return false;
    }
    try {
      const res = await fetch(`/api/projects.json`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ project, email: user.email })
      });
      if (res.ok) {
        user.projects = user.projects.filter((item) => item !== project);
        protectedProjects = protectedProjects.filter((item) => item !== project);
        projects = projects.filter((item) => item.shortTitle !== project);
        return;
      }

      alert('Could not delete project');
    } catch (error) {
      return new Error('Could not delete project');
    }
  }
</script>

<h1>Todo Lists</h1>
<section class="welcome">
  <p>Welcome, {user.fullName ? user.fullName : 'stranger'}!</p>
  <div class="user-summary">
    <p>Initials: {user.initials ? user.initials : ''}</p>
    <p>{user.isAdmin ? 'You are admin' : ''}</p>
    <p>E-mail: {user.email}</p>
  </div>

  <h2>Your projects</h2>
  <div class="projects">
    {#if user.projects.length > 0}
      {#each user.projects as project (project)}
        <a href="/{project}"
          ><div class="project">
            {projects.find((el) => el.shortTitle === project).fullTitle}
          </div></a
        >
        <div class="icons">
          {#if !protectedProjects.includes(project) || user.isAdmin}
            <i
              class="far fa-trash-alt icon-danger right"
              aria-hidden="true"
              on:click={handleDeleteProject(project)}
            />
          {/if}
        </div>
      {/each}
    {:else}
      <span>you have no projects assigned</span>
    {/if}
  </div>
</section>

<style>
  h1 {
    text-align: center;
  }
  .welcome {
    text-align: center;
    margin-bottom: 4rem;
  }
  .projects {
    display: grid;
    grid-template-columns: 1fr 20px;
    gap: 1em;
    align-items: center;
    max-width: 300px;
    margin: 0 auto 4em auto;
  }
  .project {
    padding: 1em;
    border: 1px solid black;
    border-radius: 5px;
    box-shadow: 1px 1px 5px rgba(83, 82, 82, 50%);
  }
  .project:hover {
    background-color: rgba(150, 138, 123, 1);
    color: white;
    cursor: pointer;
  }
  .projects a,
  .projects a:visited {
    text-decoration: none;
    color: inherit;
  }
  i {
    cursor: pointer;
  }
  i:hover {
    opacity: 0.8;
  }
  .icon-danger:hover {
    color: red;
  }
</style>
