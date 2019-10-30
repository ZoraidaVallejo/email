module.exports = {
    target: {
        options: {
            preserveMediaQueries: true,
            applyAttributesTableElements: true,
            applyWidthAttributes: true,
            applyHeightAttributes: true,
            preserveImportant: true,
            webResources: {
                images: false
            }
        },
        files: [
            {
                expand: true,
                src: ['<%= relativeFolders.dist %>/*.html'],
                dest: ''
            }
        ]
    }
};
