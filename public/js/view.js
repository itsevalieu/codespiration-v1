 // Project 2 - View.js
 $(document).ready(function () {
//In row functions
 	$(document).on("click", "editProject-btn", editProject);
 	$(document).on("keyup", ".projectRow", completeEdit);
 	$(document).on("blur", ".projectRow", cancelEdit);
 	$(document).on("click", "newProject-btn", createNewProject);
 	$(document).on("click", "closeProject-btn", closeProject);
 	$(document).on("click", "completeProject-btn", completeProject);
	 
//sidebar / nav functions
 	$(document).on("click", "newProject-btn", createNewProject);
 	$(document).on("click", "generateProject-btn", generateProject);
 	$(document).on("click", "addTech-btn", addTech);
 	$(document).on("click", "showOpenProjects-btn", showOpenProjects);

 	//Projects Details Array
 	var projects = [];

 	//Project List DOM Element 
 	var projectList = $(".projectList");

 	//Grab Projects when Page Loads
 	getProjects();

 	function displayProjects() {
 		//Cleans out DOM element
 		projectList.empty();
 		var projectListings = [];

 		for (var i = 0; i < projects.length; i++) {
 			projectListings.push(createProjectListing(projects[i]));
 		}
 		projectList.prepend(projectListings);
 	}

 	function getProjects() {
 		$.get("/api/projects", function (data) {
 			projects = data;
 			displayProjects();
 		});
 	}

 	function createProjectListing(project) {
 		var projectRow;
 		projectRow = $("<li>");
 		projectRow.addClass("projectRow");

 		var projectName;
 		projectName = $("<span>");
 		projectName.addClass("projectTitle");
 		projectName.text(project.task);
 		projectName.append($("</span>"));
 		projectRow.append(projectName);

 		var githubLink;
 		githubLink = $("<a href=" + project.githubLink + "><span><i class='medium material-icons'>pageview</i>");
 		githubLink.text("GitHub");
 		githubLink += $("</span");
 		projectRow.append(githubLink);

 		var editProjectBtn;
 		editProjectBtn = $("<i class='medium material-icons'>mode_edit</i>");
 		editProjectBtn.addClass("editProject-btn");
 		editProjectBtn.data("id", project.id);
 		projectRow.append(editProjectBtn);

 		var getHelpBtn;
 		getHelpBtn = $("<i class='medium material-icons'>question_answer</i>");
 		getHelpBtn.addClass("material-icons forum getHelp-btn");
 		projectRow.append(getHelpBtn);

 		var closeProject;
 		closeProject = $("<i class='medium material-icons'>assignment_late</i>");
 		closeProject.addClass("closeProject-btn");
 		projectRow.append(closeProject);

 		projectRow.append($("</li>"));

 		return projectRow;
 	}

 	function editProject() {
 		var edittedProject = $(this).data("project");
 		$(this).children().hide();
 		$(this).children("input.edit").val(edittedProject.text);
 		$(this).children("button").show();
 		$(this).children("input.edit").focus();
 	}

 	function completeEdit(project) {
 		var edittedProject;
 		if (project.key === "Enter") {
 			edittedProject = {
 				id: $(this).data("project").id,
 				projectName: $(this).children("input").val().trim()
 			};
 			$(this).blur();
 			updateProject(edittedProject);
 		}
 	}

 	function cancelEdit() {
 		var projectToEdit = $(this).data("project");
 		$(this).children().hide();
 		$(this).children("input.edit").val(projectToEdit.text);
 		$(this).children("span").show();
 		$(this).children("i").show();
 	}

 	//take user input data to create new project item in database
 	function createNewProject(project) {
 		project.preventDefault();
 		var project = {
 			projectName: inputProjectName.val().trim(),
 			projectTeam: inputProjectTeam.val().trim(),
 			completed: false,
 			projectFinishDate: inputProjectDueDate.val().trim()
 		};
 		$.post("/api/projects", projects, function () {
 			getProjects();
 		});
 		//resets form to null values for multiple project entry
 		inputProjectName.val("");
 		inputProjectTeam.val("");
 		inputProjectDueDate.val("");
 	}

 	//On click, deletes project from database based on id
 	function closeProject() {
 		var projectToClose = $(this).data("id");

 		$.ajax({
 			method: "DELETE",
 			url: "/api/projects" + projectToClose
 		}).done(function () {
 			getProjects();
 		});
 	}

 	//update project status to "Completed"
 	function completeProject() {
 		var projectCompleted = $(this).data("id");
 		projectCompleted.completed = true;
 		updateProject(projectCompleted);
 	}

 	//AJAX PUT request to database
 	function updateProject(project) {
 		$.ajax({
 			method: "PUT",
 			url: "/api/projects",
 			data: project
 		}).done(function () {
 			getProjects();
 		});
 	}

 });
