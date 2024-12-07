document.addEventListener('DOMContentLoaded', function() {
    const filterSelects = document.querySelectorAll('.filter-select');
    const tagButtons = document.querySelectorAll('.tag');
    const clearFiltersButton = document.querySelector('.clear-filters');
    const filterCount = document.querySelector('.filter-count');
    const galleryItems = document.querySelectorAll('.gallery-category');

    let activeFilters = {
        style: '',
        setting: '',
        tags: []
    };

    function updateFilterCount() {
        const visibleItems = document.querySelectorAll('.gallery-category:not(.filtered-hidden)').length;
        filterCount.textContent = `Showing ${visibleItems} of ${galleryItems.length} images`;
    }

    function filterGallery() {
        galleryItems.forEach(item => {
            const style = item.querySelector('img').dataset.style || '';
            const setting = item.querySelector('img').dataset.setting || '';
            const tags = (item.querySelector('img').dataset.tags || '').split(',');

            const styleMatch = !activeFilters.style || style === activeFilters.style;
            const settingMatch = !activeFilters.setting || setting === activeFilters.setting;
            const tagsMatch = activeFilters.tags.length === 0 || 
                            activeFilters.tags.some(tag => tags.includes(tag));

            if (styleMatch && settingMatch && tagsMatch) {
                item.classList.remove('filtered-hidden');
            } else {
                item.classList.add('filtered-hidden');
            }
        });

        updateFilterCount();
    }

    filterSelects.forEach(select => {
        select.addEventListener('change', (e) => {
            const filterType = e.target.dataset.filter;
            activeFilters[filterType] = e.target.value;
            filterGallery();
        });
    });

    tagButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const tag = e.target.dataset.tag;
            button.classList.toggle('active');

            if (button.classList.contains('active')) {
                activeFilters.tags.push(tag);
            } else {
                activeFilters.tags = activeFilters.tags.filter(t => t !== tag);
            }
            filterGallery();
        });
    });

    clearFiltersButton.addEventListener('click', () => {
        activeFilters = {
            style: '',
            setting: '',
            tags: []
        };

        filterSelects.forEach(select => select.value = '');
        tagButtons.forEach(button => button.classList.remove('active'));
        filterGallery();
    });

    // Initial count
    updateFilterCount();
});
