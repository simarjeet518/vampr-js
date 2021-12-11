class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;

  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    
    return this.offspring.length;

  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let number = 0;
    let vampire = this;

    while (vampire.creator) {
      vampire = vampire.creator;
      number++;
    }
    return number;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    let result = true;
    if (this.creator) {
      if (vampire.creator) {
        const newThis = this.creator;
        const newVampire = vampire.creator;
        result = newThis.isMoreSeniorThan(newVampire);
      } else result = false;
    }
    return result;

  }

 
  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    if (this === vampire) {
      return this;
    }
    if (this.creator && vampire.creator) {
      if (this.creator === vampire) {
        return vampire;
      }
      if (vampire.creator === this) {
        return this;
      }
      if (this.creator === vampire.creator) {
        return this.creator;
      }
      if (this.isMoreSeniorThan(vampire)) {
        return (this.closestCommonAncestor(vampire.creator.creator));
      }
      if (vampire.isMoreSeniorThan(this)) {
        return (vampire.closestCommonAncestor(this.creator.creator));
      }
    }
    return  this.creator ? vampire : this;
   
  }
}


module.exports = Vampire;

