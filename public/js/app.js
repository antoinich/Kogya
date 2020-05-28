let $map = document.querySelector('#map')

class LeafletMap {

    constructor () {
        this.map = null
        this.bounds = []
    }

    async load(element) {
        return new Promise((resolve, reject) => {
            $script('https://unpkg.com/leaflet@1.6.0/dist/leaflet.js', () => {
                this.map = L.map(element)
                L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
                    attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                    maxZoom: 18,
                    id: 'mapbox/streets-v11',
                    tileSize: 512,
                    zoomOffset: -1,
                    accessToken: 'pk.eyJ1IjoiYW50b2luaWNoIiwiYSI6ImNrYWt2c3R1MzBvN24ydHA2NWZndTRvdW0ifQ.qksyg6tRqKmiUM8AYCnRKQ'
                }).addTo(this.map);
                resolve()
            })
        })
    }

    addMarker (lat, lng, text) {
        let point = [lat, lng]
        this.bounds.push(point)
        return new LeafletMarker(point, text, this.map)

    }

    center () {
        this.map.fitBounds(this.bounds)
    }
}

class LeafletMarker {
    constructor (point, text, map) {
        this.text = text
        this.popup = L.popup({
            autoClose: false,
            closeOnEscapeKey: false,
            closeOnClick: false,
            closeButton: false,
            className: 'marker',
            closePopupOnClick: 'true',
            maxWidth: 400
        })
            .setLatLng(point)
            .setContent(text)
            .openOn(map)
    }

    setActive () {
        this.popup.getElement().classList.add('is-active')
    }

    unsetActive () {
        this.popup.getElement().classList.remove('is-active')
    }

    addEventListener (event, cb) {
        this.popup.addEventListener('add', () => {
            this.popup.getElement().addEventListener(event, cb)
        })
    }

    setContent (text) {
        this.popup.setContent(text)
        this.popup.getElement().classList.add('is-expanded')
        this.popup.update()
    }

    resetContent() {
        this.popup.setContent(this.text)
        this.popup.getElement().classList.remove('is-expanded')
        this.popup.update()
    }
}

const initMap = async function () {
    let map = new LeafletMap();
    let hoverMarker = null
    let activeMarker = null
    await map.load($map);
    Array.from(document.querySelectorAll('.js-marker')).forEach((item) => {
        let marker = map.addMarker(item.dataset.lat, item.dataset.lng, item.dataset.price + ' €');
        item.addEventListener('mouseover', function () {
            if (hoverMarker !== null) {
                hoverMarker.unsetActive()
            }
            marker.setActive()
            hoverMarker = marker
        })
        item.addEventListener('mouseleave', function () {
            if (hoverMarker !== null) {
                hoverMarker.unsetActive()
            }
        })
        marker.addEventListener('click', function () {
            if (activeMarker !== null) {
                activeMarker.resetContent()
            }
            marker.setContent(item.innerHTML)
            activeMarker = marker
        })
    });
    map.center()
};

if ($map !== null) {
    initMap()
}
