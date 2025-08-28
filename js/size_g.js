// Banner hide on scroll
window.addEventListener('scroll', function () {
    const banner = document.querySelector('.banner');
    if (window.scrollY > 50) {
        banner.classList.add('hidden');
    } else {
        banner.classList.remove('hidden');
    }
});

// Size Guide JavaScript
document.addEventListener('DOMContentLoaded', function () {
    // Category switching
    const categoryBtns = document.querySelectorAll('.category-btn');
    const sizeCharts = document.querySelectorAll('.size-chart');

    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            // Remove active class from all buttons
            categoryBtns.forEach(b => b.classList.remove('active'));

            // Add active class to clicked button
            this.classList.add('active');

            // Hide all size charts
            sizeCharts.forEach(chart => chart.classList.remove('active'));

            // Show selected size chart
            const category = this.getAttribute('data-category');
            document.getElementById(`${category}-chart`).classList.add('active');
        });
    });

    // Get elements
    const calculateBtn = document.getElementById('calculate-btn');
    const resultElement = document.getElementById('result');
    const heightInput = document.getElementById('height');
    const weightInput = document.getElementById('weight');
    const measurementInput = document.getElementById('measurement');

    // Add event listener to calculate button
    calculateBtn.addEventListener('click', function () {
        // Get values from inputs
        const height = parseFloat(heightInput.value);
        const weight = parseFloat(weightInput.value);
        const chest = parseFloat(measurementInput.value);

        // Validate inputs
        if (!height || !weight || !chest) {
            resultElement.innerHTML = '<strong style="color: #e74c3c;">Please fill in all fields with valid numbers</strong>';
            return;
        }

        if (height < 10 || height > 220) {
            resultElement.innerHTML = '<strong style="color: #e74c3c;">Please enter a height between 140cm and 220cm</strong>';
            return;
        }

        if (weight < 20 || weight > 150) {
            resultElement.innerHTML = '<strong style="color: #e74c3c;">Please enter a weight between 30kg and 150kg</strong>';
            return;
        }

        if (chest < 10 || chest > 140) {
            resultElement.innerHTML = '<strong style="color: #e74c3c;">Please enter a chest measurement between 60cm and 140cm</strong>';
            return;
        }

        // Calculate BMI for additional reference
        const heightInMeters = height / 100;
        const bmi = weight / (heightInMeters * heightInMeters);

        // Calculate size based on all three factors
        let size = calculateSize(height, weight, chest);

        // Display result
        resultElement.innerHTML = `
                    <strong>Recommended Size: <span style="color: #3498db; font-size: 1.4rem;">${size}</span></strong>
                    <div class="result-details">
                        <p>Based on your measurements</p>
                    </div>
                `;
    });

    // Enhanced size calculation using all three factors
    function calculateSize(height, weight, chest) {
        // Base size primarily on chest measurement
        let baseSize;
        if (chest < 85) baseSize = 'XS';
        else if (chest < 92) baseSize = 'S';
        else if (chest < 99) baseSize = 'M';
        else if (chest < 107) baseSize = 'L';
        else if (chest < 115) baseSize = 'XL';
        else baseSize = 'XXL';

        // Adjust based on height
        if (height > 185) {
            if (baseSize === 'XS') baseSize = 'S';
            else if (baseSize === 'S') baseSize = 'M';
        } else if (height < 160) {
            if (baseSize === 'S') baseSize = 'XS';
            else if (baseSize === 'M') baseSize = 'S';
        }

        // Adjust based on weight (BMI consideration)
        const heightInMeters = height / 100;
        const bmi = weight / (heightInMeters * heightInMeters);

        if (bmi > 28 && baseSize !== 'XXL') {
            // If BMI indicates overweight, consider going one size up
            if (baseSize === 'XS') baseSize = 'S';
            else if (baseSize === 'S') baseSize = 'M';
            else if (baseSize === 'M') baseSize = 'L';
            else if (baseSize === 'L') baseSize = 'XL';
            else if (baseSize === 'XL') baseSize = 'XXL';
        } else if (bmi < 18.5 && baseSize !== 'XS') {
            // If BMI indicates underweight, consider going one size down
            if (baseSize === 'XXL') baseSize = 'XL';
            else if (baseSize === 'XL') baseSize = 'L';
            else if (baseSize === 'L') baseSize = 'M';
            else if (baseSize === 'M') baseSize = 'S';
            else if (baseSize === 'S') baseSize = 'XS';
        }

        return baseSize;
    }

    // Add input validation to prevent negative numbers
    const numberInputs = document.querySelectorAll('input[type="number"]');
    numberInputs.forEach(input => {
        input.addEventListener('input', function () {
            if (this.value < 0) {
                this.value = 0;
            }
        });
    });

    // Add Enter key functionality
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                calculateBtn.click();
            }
        });
    });
});