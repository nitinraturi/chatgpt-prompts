// Global Variables
const promptButton = document.createElement('button');
const modal = document.createElement('div');
const modalContent = document.createElement('div');
const modalHeader = document.createElement('div');
const modalTitle = document.createElement('p');
const modalCTA = document.createElement('a');
const closeBtn = document.createElement('span');
const modalBody = document.createElement('div');
const modalFooter = document.createElement('div');
const mainChatBox = document.getElementsByTagName('textarea')[0];

// Create a prompt button
function initializePromptButton() {
    promptButton.innerText = '>_ Prompts';
    promptButtonClasses = ['prompt-button']
    promptButtonClasses.forEach(element => {
        promptButton.classList.add(element);
    });

    // Append the prompt button to nav
    document.getElementsByTagName('nav')[0].appendChild(promptButton);

    // Define a function to inject the modal into the page
    promptButton.addEventListener('click', () => {
        console.log("I am clicked");
        modal.style.display = 'block';
        renderPromptsModal();
    });
}

function createModal() {
    const info_html = `
    <p><span><a class='link-sourcecode' href='https://github.com/nitinraturi/chatgpt-prompts' target='_blank' rel='noreferrer'>Source Code - Bug/Issue/Feature/Prompts</a></span></p>
    `
    modal.classList.add('modal');
    modalContent.classList.add('modal-content');
    modalHeader.classList.add('modal-header');
    modalTitle.innerText = 'ChatGPT Prompts v1.0.0';

    closeBtn.classList.add('close');
    closeBtn.innerHTML = '&times;';
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    modalHeader.appendChild(modalTitle);
    modalHeader.appendChild(closeBtn);
    modalBody.classList.add('modal-body');
    modalFooter.classList.add('modal-footer');
    modalFooter.innerHTML = info_html;
    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalBody);
    modalContent.appendChild(modalFooter);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}


const PROMPT_BLOG_POST = `I want you to write a comprehensive 2,000-word article about “KEYWORD” that is engaging, easy to understand, and unique. Make the content punchy and engaging by using a conversational tone, incorporating real-life examples, and taking a storytelling approach. Optimize on-page SEO for "KEYWORD" with high keyword density and inclusion in headers. Use markdown formatting, including bold, UL/OL, code, table, etc, and avoid providing a table of contents. The writing should appear human-like, and I will provide additional prompts as needed to reach the desired word count. Write from an analytical perspective, and give the user a step-by-step guide on how to dress for a “KEYWORD”, while naturally including the Questions and FAQ below \n

Questions
1. Numbers in Python?
2. How do you declare a number in Python?

FAQ
1. Is number an immutable data type in Python?
2. How do you divide numbers in Python?
 
Do you understand?`

// Define an array of built-in prompts
const builtInPrompts = [
    {
        name: 'Blog Post', value: PROMPT_BLOG_POST
    },
];

// Define a function to get custom prompts from local storage
function getCustomPrompts() {
    let customPrompts = localStorage.getItem("customPrompts");
    if (customPrompts) {
        return JSON.parse(customPrompts);
    } else {
        return [];
    }
}

// Define a function to save custom prompts to local storage
function saveCustomPrompts(customPrompts) {
    localStorage.setItem("customPrompts", JSON.stringify(customPrompts));
}

function renderPromptsModal() {
    // Clear the modal body
    modalBody.innerHTML = "";

    // Create a table to hold the prompts
    const table = document.createElement("table");
    table.classList.add("prompt-table");

    // Add the table header
    const headerRow = document.createElement("tr");
    const nameHeader = document.createElement("th");
    nameHeader.textContent = "Name";
    // const valueHeader = document.createElement("th");
    // valueHeader.textContent = "Value";
    const actionHeader = document.createElement("th");
    actionHeader.textContent = "Action";
    headerRow.appendChild(nameHeader);
    // headerRow.appendChild(valueHeader);
    headerRow.appendChild(actionHeader);
    table.appendChild(headerRow);

    // Add the built-in prompts to the table
    builtInPrompts.forEach((prompt) => {
        const row = document.createElement("tr");
        const nameCell = document.createElement("td");
        nameCell.textContent = prompt.name;
        // const valueCell = document.createElement("td");
        // valueCell.textContent = prompt.value;
        const applyCell = document.createElement("td");
        const applyButton = document.createElement("button");
        applyButton.textContent = "Apply";
        applyButton.addEventListener("click", () => {
            mainChatBox.value = prompt.value;
            modal.style.display = "none";
            mainChatBox.style.height = '600px';
        });
        applyCell.appendChild(applyButton);
        row.appendChild(nameCell);
        // row.appendChild(valueCell);
        row.appendChild(applyCell);
        table.appendChild(row);
    });

    // Add the custom prompts to the table
    // const customPrompts = getCustomPrompts();
    // customPrompts.forEach((prompt, index) => {
    //     const row = document.createElement("tr");
    //     const nameCell = document.createElement("td");
    //     const nameInput = document.createElement("input");
    //     nameInput.type = "text";
    //     nameInput.value = prompt.name;
    //     nameCell.appendChild(nameInput);
    //     const valueCell = document.createElement("td");
    //     const valueInput = document.createElement("textarea");
    //     valueInput.value = prompt.value;
    //     valueCell.appendChild(valueInput);
    //     const applyCell = document.createElement("td");
    //     const applyButton = document.createElement("button");
    //     applyButton.classList.add('btn-edit')
    //     applyButton.textContent = "Apply";
    //     applyButton.addEventListener("click", () => {
    //         mainChatBox.value = prompt.value;
    //         modal.style.display = "none";
    //     });
    //     applyCell.appendChild(applyButton);
    //     row.appendChild(nameCell);
    //     row.appendChild(valueCell);
    //     row.appendChild(applyCell);
    //     table.appendChild(row);
    // });

    // Add the table to the modal body
    modalBody.appendChild(table);
}


function chatGPTPromptsInitialize() {
    initializePromptButton();
    createModal();
}

chatGPTPromptsInitialize();

