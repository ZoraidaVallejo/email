module.exports = {
    target: {
        options: {
            optimizationLevel: 3,
            svgoPlugins: [
                {
                    removeViewBox: false
                }
            ]
        },
        files: [
            {
                expand: true,
                cwd: '<%= relativeFolders.srcImg %>',
                src: ['**/*.{png,jpg,gif}'],
                dest: '<%= relativeFolders.distImg %>'
            }
        ]
    }
};
