import { hugging_face_key } from "./keys.js";


async function query(data) {
	const response = await fetch(
		"https://router.huggingface.co/nscale/v1/images/generations",
		{
			headers: {
				Authorization: `Bearer ${hugging_face_key}`,
				"Content-Type": "application/json",
			},
			method: "POST",
			body: JSON.stringify(data),
		}
	);
	const result = await response.json();
	return result;
}


async function generateImage(promptText) {
    try {
        const result = await query({
            prompt: promptText,
            model: "stabilityai/stable-diffusion-xl-base-1.0",
            response_format: "b64_json"
        });
        const base64 = result.data[0].b64_json;
        const img = document.createElement("img");
        img.src = `data:image/png;base64,${base64}`;
        // Place image in the .image-output div
        const outputDiv = document.querySelector('.image-output');
        if (outputDiv) {
            outputDiv.innerHTML = '';
            outputDiv.appendChild(img);
        } else {
            document.body.appendChild(img);
        }
    } catch (error) {
        console.error("Failed to generate image:", error);
    }
}

//Changes to your code from yesterday- Use Ctrl X and Ctrl V to copy the line 2 and 3
// inside this function to the top of the file
document.addEventListener("DOMContentLoaded", function() {
    let input = document.querySelector(".user-input");
    let submit = document.querySelector(".submit");
 
    submit.addEventListener("click", () => {
        if ( input.value != ""){
            generateImage(input.value);
        }

    });

});