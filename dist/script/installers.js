var tag_template = `
<a class="tag">
    TAG
</a>
`

var button_template = `
<a
    ondragstart="return false;"
    href="URL"
    target="_blank"
    class="button"
>
    <img src="ICON" />
    <span>NAME</span>
</a>
`

var template = `
<div class="launcher">
    <div class="header"> 
        <img src="ICONNAME">
        <div class="name header">NAME</div>
    </div>
    <div class="blurb">
        DESCRIPTION
    </div>
    <div class="tags">
        TAGS
    </div>
    <div class="buttons">
        BUTTONS
    </div>
</div>
`

function addInstaller(group, icon, name, description, tags, buttons) {
    var tagsstr = "";
    var buttonsstr = "";

    for (const tag of tags) {
        tagsstr += tag_template.replace("TAG", tag);
    }

    for (const name in buttons) {
        buttonsstr += button_template
            .replace("NAME", name)
            .replace("URL", buttons[name].url)
            .replace("ICON", buttons[name].icon);
    }

    var x = template.replace("ICONNAME", icon)
        .replace("NAME", name)
        .replace("DESCRIPTION", description)
        .replace("TAGS", tagsstr)
        .replace("BUTTONS", buttonsstr);

    document.getElementById(group).insertAdjacentHTML("beforeend", x);
}

function loadsInstallers() {
    fetch('/data/installers.json')
        .then(response => response.json())
        .then(data => {
            data.forEach(item => {
                addInstaller("installers", item.icon, item.name, item.description, item.tags, item.buttons);
            });
        })
        .catch(error => console.error('Error fetching the JSON file:', error));
}
