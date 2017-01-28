// Project 2 - View.js
$(document).ready(function () {
	$(document).on("click", "newProject-btn", createNewProject);
	$(document).on("click", "editProject-btn", editProject);
	$(document).on("click", "closeProject-btn", closeProject);
	$(document).on("click", "generateProject-btn", generateProject);
	$(document).on("click", "getHelp-btn", getHelp);
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
		projectName.text(project.task);
		projectName = $("</span>");
		projectRow.append(projectName);

		var githubLink;
		githubLink = $("<a href=" + project.githubLink + "><span><i>pageview</i>");
		githubLink.text("GitHub");
		githubLink = $("</span");
		projectRow.append(githubLink);

		var editProjectBtn;
		editProjectBtn = $("<button");
		editProjectBtn.addClass("editProject-btn");
		editProjectBtn.data("id", project.id);
		projectRow.append(editProjectBtn);

		var getHelpBtn;
		getHelpBtn = $("<i>question_answer</i>");
		getHelpBtn.addClass("material-icons forum getHelp-btn");
		projectRow.append(getHelpBtn);

		var closeProject;
		closeProject = $("<i>assignment_late</i>");
		closeProject.addClass("closeProject-btn");
		projectRow.append(closeProject);

		return projectRow;
	}

	function editProject() {
		var edittedProject = $(this).data("project");
		$(this).children().hide();
		$(this).children("input.edit").val(edittedProject.text);
		$(this).children("button").show();
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

});
