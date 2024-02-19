"use client";
import React, { useEffect, useState } from "react";
import { Feature, Map, Overlay, View } from "ol";
import { OSM, Vector as VectorSource } from "ol/source";
import { Point } from "ol/geom";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { useGeographic } from "ol/proj";
import { NASA_URL, REQUEST_ERROR } from "@/infrastructure/consts";
import {
  geoCoordinates,
  formattedData,
} from "@/infrastructure/utilities/requests";
import { MeteoriteFormattedType } from "@/domain/entities/meteorite";

export default function Geocode() {
  const [message, setMessage] = useState("");
  const [coordinates, setCoordinates] = useState<any>();

  useEffect(() => {
    useGeographic();

    const place = [-206.42, 37.19];

    if (!localStorage.getItem("coordinates")) {
      const url = NASA_URL;
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };
      fetch(url, options)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const formattedCoordinatesData = geoCoordinates(data);
          localStorage.setItem(
            "coordinates",
            JSON.stringify(formattedCoordinatesData)
          );

          const formattedMeteoriteData = formattedData(data);
          localStorage.setItem(
            "meteoriteData",
            JSON.stringify(formattedMeteoriteData)
          );
        })
        .catch((error) => {
          setMessage(REQUEST_ERROR);
        });
    }

    const stringCoordinates = localStorage.getItem("coordinates");

    const coordinatesData = stringCoordinates
      ? JSON.parse(stringCoordinates)
      : null;
    if (coordinatesData) {
      setCoordinates(coordinatesData);

      const stringMeteoriteData = localStorage.getItem("meteoriteData");
      const meteoriteData = stringMeteoriteData
        ? JSON.parse(stringMeteoriteData)
        : null;

      const features = coordinatesData.geolocation.map((item: number[]) => {
        return new Feature({
          geometry: new Point([item[0], item[1]]),
        });
      });

      const map = new Map({
        target: "map",
        view: new View({
          center: place,
          zoom: 1,
        }),
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
          new VectorLayer({
            source: new VectorSource({
              features: features,
            }),
            style: {
              "circle-radius": 3,
              "circle-fill-color": "red",
            },
          }),
        ],
      });

      const element = document.getElementById("popup");

      const popup = new Overlay({
        element: element,
        stopEvent: false,
      });
      map.addOverlay(popup);

      function meteoriteHtml(geocoordinates) {
        if (meteoriteData) {
          const meteorite = meteoriteData.find(
            (item: MeteoriteFormattedType) =>
              item.geolocation[0] === geocoordinates[0] &&
              item.geolocation[1] === geocoordinates[1]
          );
          if (meteorite) {
            return `
            <tr><th class="px-2 text-right font-bold">Name:</th><td>${meteorite.name}</td></tr>
            <tr><th class="px-2 text-right font-bold">Year:</th><td>${meteorite.year}</td></tr>
            <tr><th class="px-2 text-right font-bold">Mass:</th><td>${meteorite.mass}</td></tr>
            <tr><th class="px-2 text-right font-bold">Rec Class:</th><td>${meteorite.recclass}</td></tr>
            <tr><th class="px-2 text-right font-bold">Fall:</th><td>${meteorite.fall}</td></tr>
            <tr><th class="px-2 text-right font-bold">Rec Lat:</th><td>${meteorite.reclat}</td></tr>
            <tr><th class="px-2 text-right font-bold">Rec Long:</th><td>${meteorite.reclong}</td></tr>
          </tr>`;
          } else {
            return "";
          }
        }
      }

      function formatCoordinate(coordinate: number[]) {
        return `<table class="bg-white p-2 w-[300px] shadow-md">
          <tbody>
            ${meteoriteHtml(coordinate)}
            <tr>
              <th class="px-2 text-right font-bold">lon:</th>
              <td>${coordinate[0].toFixed(2)}</td>
            </tr>
            <tr>
              <th class="px-2 text-right font-bold">lat:</th>
              <td>${coordinate[1].toFixed(2)}</td>
            </tr>
          </tbody>
        </table>`;
      }

      map.on("moveend", function () {
        const view = map.getView();
        const center = view.getCenter();
      });

      let popover;
      map.on("click", function (event) {
        if (popover) {
          popover.dispose();
          popover = undefined;
        }
        const feature = map.getFeaturesAtPixel(event.pixel)[0];
        if (!feature) {
          return;
        }
        const coordinate = feature.getGeometry().getCoordinates();
        popup.setPosition([
          coordinate[0] + Math.round(event.coordinate[0] / 360) * 360,
          coordinate[1],
        ]);

        popover = new bootstrap.Popover(element, {
          container: element.parentElement,
          content: formatCoordinate(coordinate),
          html: true,
          offset: [0, 20],
          placement: "top",
          sanitize: false,
        });
        popover.show();
      });

      map.on("pointermove", function (event) {
        const type = map.hasFeatureAtPixel(event.pixel) ? "pointer" : "inherit";
        map.getViewport().style.cursor = type;
      });
    }
  }, []);

  return (
    <div>
      <h2 className="text-2xl mb-4">Map View of Geolocations</h2>
      {message}
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.bundle.min.js"></script>
      <div id="map" className="map h-[800px] w-full">
        <div id="popup"></div>
      </div>
    </div>
  );
}
