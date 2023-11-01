import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectsSidebar from "./components/ProjectsSidebar";
import {useState} from 'react';
import SelectedProject from "./components/SelectedProject";
function App() {

  const [projectsState,setProjectState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks:[],
  });

  function handleAddTask(text){
    setProjectState(prevState=> {
      
      const taskId = Math.random();
      const newTask = {
        text: text,
        projectId: prevState.selectedProjectId,
        id: taskId,
      };
      return {
        ...prevState,
        selectedProjectId: prevState.selectedProjectId,
        tasks: [newTask,...prevState.tasks]
      };
    })
  }

  function handleDeleteTask(id){
    setProjectState(prevState => {
      return{
        ...prevState,
        tasks: prevState.tasks.filter( (task) => task.id !== id  )
      }
    })
  }

  function handleStartAddProject(){
    setProjectState(prevState => {
      return{
        ...prevState,
        selectedProjectId: null,
      }
    })
  }

  function handleAddProject (projectData){
    setProjectState(prevState=> {
      const projectId = Math.random();
      const newProject = {
        ...projectData,
        id: projectId,
      };
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject]
      };
    })
  }

  function handleCancelAddProject(){
    setProjectState(prevState => {
      return{
        ...prevState,
        selectedProjectId: undefined,
      }
    })
  }

  function handleSelectProject(id){
    setProjectState(prevState => {
      return{
        ...prevState,
        selectedProjectId: id,
      }
    })
  }

  function handleDeleteProject(){
    setProjectState(prevState => {
      return{
        ...prevState,
        selectedProjectId: undefined,
        projects: prevState.projects.filter( (project) => project.id !== prevState.selectedProjectId  )
      }
    })
  }

  const selectedProject = projectsState.projects.find(project => project.id === projectsState.selectedProjectId)
  
  let content = <SelectedProject tasks={projectsState.tasks}  onDeleteTask={handleDeleteTask} onAddTask={handleAddTask} onDelete={handleDeleteProject} project={selectedProject}/>;
  
  if(projectsState.selectedProjectId === null){
    content = <NewProject onCancel={handleCancelAddProject} onAdd={handleAddProject}/>
  }else if (projectsState.selectedProjectId === undefined){
    content = <NoProjectSelected onStartAddProject={handleStartAddProject}/>
  }


  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar selectedProjectId={projectsState.selectedProjectId} onSelectProject={handleSelectProject}  onStartAddProject={handleStartAddProject} projects={projectsState.projects}/>
      {content}
    </main>
  );
}

export default App;
