async function get(url) {
    const response = await fetch(url);

    if (response.status === 200) {
        return response.json();
    } else {
        return "";
    }
}

window.onload = async function () {
    const dep_box = document.getElementById("departures-box");
    const departures = await get("https://api.train-tracked.com/departures?crs=PMH&token=doughnutStealMahD@a");

    dep_box.innerHTML = "";

    departures.services.forEach(service => {
        const dep_time = new Date(Date.parse(service.std));
        // const arr_time = new Date(Date.parse(service.sta));

        const card = document.createElement("div");
        dep_box.appendChild(card);
        card.className = "dep-card";

        const left = document.createElement("div");
        const dest = document.createElement("h1");
        const toc = document.createElement("h2");
        dest.innerText = `to ${service.destination[0]}`
        toc.innerText = service.operator;

        left.appendChild(dest);
        left.appendChild(toc);

        const dep_text = document.createElement("h3");
        dep_text.innerText = `${dep_time.getHours()}:${dep_time.getMinutes()}`;

        const right = document.createElement("div");
        const platform_label = document.createElement("p");
        const platform = document.createElement("h4");
        platform_label.innerText = "Platform";
        platform.innerText = service.platform;

        right.appendChild(platform_label);
        right.appendChild(platform);

        card.appendChild(left);
        card.appendChild(dep_text);
        card.appendChild(right);
    });
}