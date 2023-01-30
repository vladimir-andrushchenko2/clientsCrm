import { getFullName } from '../utils';

// created interface bc i want to chain modifiers
// and preserve original array i use modifiers
class ClientsInterface {
  constructor(clientsShallowCopy) {
    this._clients = clientsShallowCopy;
  }

  sortedByName(isReversed) {
    return new ClientsInterface(this.data().sort((left, right) => {
      const fullNameLeft = getFullName(left);
      const fullNameRight = getFullName(right);

      let output = fullNameLeft > fullNameRight ? 1 : -1;

      if (isReversed) {
        output *= -1;
      }

      return output;
    }));
  }

  sortedById(isReversed) {
    return new ClientsInterface(this.data().sort(
      (left, right) => {
        let output = Number(left.id) - Number(right.id);

        if (isReversed) {
          output *= -1;
        }

        return output;
      },
    ));
  }

  _sortedDateProperty(property, isReversed) {
    return new ClientsInterface(this.data().sort((left, right) => {
      const timeLeft = new Date(left[property]);
      const timeRight = new Date(right[property]);

      let output = timeLeft - timeRight;

      if (isReversed) {
        output *= -1;
      }

      return output;
    }));
  }

  sortedByCreatedDate(isReversed) {
    return this._sortedDateProperty('createdAt', isReversed);
  }

  sortedByUpdatedDate(isReversed) {
    return this._sortedDateProperty('updatedAt', isReversed);
  }

  data() {
    return this._clients.slice();
  }
}

export default ClientsInterface;
