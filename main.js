// Get references to the elements we will interact with
const addRecommendationBtn = document.querySelector('#addRecommendation');
const newRecommendationInput = document.querySelector('#newRecommendation');
const recommendationsList = document.querySelector('.recommendations');

const likeButtons = document.querySelectorAll('.like-button');
likeButtons.forEach((likeButton) => {
  likeButton.addEventListener('click', (e) => {
    likeButton.classList.toggle('liked');
  });
});

// Get the list of recommendations from local storage
const getRecommendationsFromStorage = () => {
  // Get the string representation of the recommendations from local storage
  const recommendations = localStorage.getItem('recommendations');

  // If we have recommendations, parse the string and return the resulting array
  // If we don't have recommendations, return an empty array
  return recommendations ? JSON.parse(recommendations) : [];
};

// Add a new recommendation to the list in local storage
const addRecommendationToStorage = recommendation => {
  // Get the current list of recommendations from local storage
  const recommendations = getRecommendationsFromStorage();

  // Add the new recommendation to the list
  recommendations.push(recommendation);

  // Store the updated list of recommendations in local storage
  localStorage.setItem('recommendations', JSON.stringify(recommendations));
};

// Remove a recommendation from the list in local storage
const removeRecommendationFromStorage = recommendation => {
  // Get the current list of recommendations from local storage
  const recommendations = getRecommendationsFromStorage();

  // Find the index of the recommendation in the list
  const index = recommendations.indexOf(recommendation);

  // If the recommendation was found in the list, remove it
  if (index !== -1) {
    recommendations.splice(index, 1);
  }

  // Store the updated list of recommendations in local storage
  localStorage.setItem('recommendations', JSON.stringify(recommendations));
};

// Render the list of recommendations to the page
const renderRecommendations = recommendations => {
  // Clear any existing recommendations from the page
  recommendationsList.innerHTML = '';

  // Loop through the list of recommendations
  recommendations.forEach(recommendation => {
    // Create a new list item to represent the recommendation
    const recommendationNode = document.createElement('li');
    recommendationNode.classList.add('recommendation');

    // Create a new paragraph to display the text of the recommendation
    const recommendationText = document.createElement('p');
    recommendationText.innerText = recommendation;

    // Create an image element to display the poster for the recommendation
    const recommendationImage = document.createElement('img');
    recommendationImage.style.display = 'none';
    recommendationImage.addEventListener('load', () => {
      recommendationImage.style.display = 'block';
    });

    // Create a button to allow the user to delete the recommendation
    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    deleteButton.addEventListener('click', () => {
      // Remove the recommendation from the page
      recommendationNode.remove();

      // Remove the recommendation from local storage
      removeRecommendationFromStorage(recommendation);
    });    

    // Add the text, image, and button to the list item
    recommendationNode.appendChild(recommendationText);
   


    recommendationNode.appendChild(recommendationText);
    recommendationNode.appendChild(recommendationImage);
    recommendationNode.appendChild(deleteButton);
    recommendationsList.appendChild(recommendationNode);

  });
};

addRecommendationBtn.addEventListener('click', () => {
  const recommendation = newRecommendationInput.value;
  if (!recommendation) {
    return;
  }

  addRecommendationToStorage(recommendation);
  renderRecommendations(getRecommendationsFromStorage());

  newRecommendationInput.value = '';
});

renderRecommendations(getRecommendationsFromStorage());
