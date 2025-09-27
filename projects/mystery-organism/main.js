// CodeCademy
// JavaScript Syntax II
// Challenge Project: Mysterious organism

// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

const pAequorFactory = (specimenNum, dna) => {
  return {
    specimenNum,
    dna,
    mutate() {
      const randomIndex = Math.floor(Math.random() * this.dna.length);
      const randomlySelectedBase = this.dna[randomIndex];
      // Removing from DNA bases the randomly selected one
      const filteredDnaBases = ['A', 'T', 'C', 'G'].filter(base => base !== randomlySelectedBase);
      const newBase = filteredDnaBases[Math.floor(Math.random() * filteredDnaBases.length)];
      this.dna[randomIndex] = newBase;
      return this.dna;
    },
    compareDNA(pAequor)
    {
      const thisPAequorDNALength = this.dna.length;
      const otherPAequorDNALength = pAequor.dna.length;

      if(thisPAequorDNALength !== otherPAequorDNALength)
      {
        console.log('compareDNA error: lengths don\'t match');
        return;
      }

      let numIdenticalBases = 0;
      for(let i = 0; i < thisPAequorDNALength; i++)
      {
        if(this.dna[i] === pAequor.dna[i]) numIdenticalBases++;
      }

      console.log(`specimen #${this.dna.specimenNum} and specimen #${pAequor.dna.specimenNum} have ${numIdenticalBases/thisPAequorDNALength}% DNA in common`)
    },
    willLikelySurvive()
    {
      let numCoincidences = 0;
      for(let i = 0; i < this.dna.length; i++)
      {
        if(this.dna[i] === 'C' || this.dna[i] === 'G') numCoincidences++;
      }
      return (numCoincidences / this.dna.length) > 0.6;
    }
  };
};
