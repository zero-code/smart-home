import Hue from 'node-hue-api';

const userId = 'UAWuNedODAfv9p5w3BwBzJx4etC2K5lcgO9RZs2K';
var bridgeAPI = null;

const Groups = {};
const Lights = {};

export function discover() {
  Hue.nupnpSearch().then(bridges => {
    if (bridges.length > 0) {
      bridgeAPI = new Hue.HueApi(bridges[0].ipaddress, userId);
      bridgeAPI.groups().then(groups => {
        groups.forEach(group => {
          if (group.lights) {
            Groups[group.name] = group;
          }
        });
      });
      bridgeAPI.lights().then(lights => {
        lights.lights.forEach(light => {
          Lights[light.id] = light;
        })
      });
    }
  })
}

export function turnOn (group) {
  bridgeAPI.setGroupLightState(Groups[group].id, Hue.lightState.create().on());
}

export function turnOff (group) {
  bridgeAPI.setGroupLightState(Groups[group].id, Hue.lightState.create().off());
}

export function turnAllOn () {
  Object.keys(Groups).forEach(turnOn)
}
export function turnAllOff () {
  Object.keys(Groups).forEach(turnOff);
}