class drive {
  constructor(renterName, rentDate, distance) {
    this.renterName = renterName
    this.rentDate = rentDate
    this.distance = distance
  }
}

class car {
  constructor(brand, model) {
    this.brand = brand
    this.model = model
    this.isRented = false
    this.totalDistance = 0
    this.drives = []
  }

  calculateTotalDistance() {
    this.totalDistance = this.drives.reduce((sum, drive) => {
      return sum + drive.distance
    }, 0)
  }

  addDrive(newDrive) {
    this.drives.push(newDrive)
    this.calculateTotalDistance()
  }
}

class rentalService {
  constructor(serviceName) {
    this.serviceName = serviceName
    this.cars = []
  }

  addCar(newCar) {
    this.cars.push(newCar)
  }

  getMostDrivenCar() {
    if (this.cars.length === 0) return null
    let mostDrivenCar = this.cars[0]

    for (let car of this.cars) {
      if (car.totalDistance > mostDrivenCar.totalDistance) mostDrivenCar = car
    }

    return mostDrivenCar
  }

  printAvailableCars() {
    console.log(`Available cars in ${this.serviceName}:`)
    const available = this.cars.filter((car) => !car.isRented)
    available.forEach((car) => {
      console.log(
        `- ${car.brand} ${car.model}, Total Distance: ${car.totalDistance} km`,
      )
    })
  }

  addDriveToCar(carName, newDrive) {
    const car = this.cars.find((c) => c.brand === carName)
    if (!car) {
      console.log(`Car ${carName} not found`)
      return
    }

    car.addDrive(newDrive)
  }
}
