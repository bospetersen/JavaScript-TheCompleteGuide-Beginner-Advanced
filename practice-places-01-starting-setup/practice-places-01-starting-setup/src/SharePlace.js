import { Modal, modal } from './UI/Modal';

class PlaceFinder {
  constructor() {
    this.addressForm = document.querySelector('form');
    this.locateUserBtn = document.getElementById('locate-btn');
    this.locateUserBtn.addEventListener('click', this.locateUserHandler);
    this.addressForm.addEventListener('click', this.findAddressHandler);
  }

  locateUserHandler() {
    if (!navigator.geolocation) {
      alert("Can´t use automatic location - Update your browser or enter an manual location")
      return;
    }

    const modal = new Modal('loading-modal-content', 'Loading locaton. Please wait!');
    modal.show();
    navigator.geolocation.getCurrentPosition(successResult => {
      modal.hide();
      const coordinates = {
        lat: successResult.coords.latitude,
        lng: successResult.coords.longitude
      }
      console.log(coordinates)
    }, error => {
      modal.hide();
      alert("Could not find you atomaticaly. Please enter an address manually!")
    })

  }
  findAddressHandler() {

  }
}

new PlaceFinder()