document.getElementById('learnMoreButton').addEventListener('click', function() {
    const moreInfo = document.getElementById('moreInfo');
    moreInfo.classList.toggle('hidden');
});

document.getElementById('moreValuesButton').addEventListener('click', function() {
    const valuesText = document.getElementById('valuesText');
    valuesText.classList.toggle('hidden');
});