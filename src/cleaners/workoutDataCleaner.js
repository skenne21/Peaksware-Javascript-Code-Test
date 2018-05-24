class AnalysisData {
  constructor(secondParams, minuteParams, data) {
    this.timeSegments = [];
    this.secondsPast = secondParams;
    this.secondsPerMintue = minuteParams;
    this.fullWorkoutData = data;

  }

  spiltIntoTwentyMins(workoutData) {
    let twentyMinChuncks;
    const session = workoutData.filter( (session,index) => {
      let timePast = session.millisecondOffset;
      if (timePast === this.secondsPast) {
        session.index = this.secondsPerMintue;
        return session;
      }
    });

    if (workoutData.length <= this.secondsPerMintue) {
      const remainder = workoutData.splice(0, workoutData.length)
      this.timeSegments.push(remainder);
      return this.timeSegments;
    } else {
      twentyMinChuncks = workoutData.splice(0, this.secondsPerMintue) 
      this.timeSegments.push(twentyMinChuncks);
    }
    

    if (workoutData[0].millisecondOffset >= this.secondsPast) {
      workoutData.forEach( session => {
        let milliseconds = session.millisecondOffset
        if (milliseconds > this.secondsPast) {
          session.millisecondOffset = milliseconds - this.secondsPast;
        }
      });
    }

    this.spiltIntoTwentyMins(workoutData);
  }

  findBest(timeSegments) {
    let highestPower = 0;

    timeSegments.forEach(intervals => {
      intervals.forEach( second => {
        let power = second.values.power
        if (power > highestPower) {
        highestPower = power;
        } 
      });
    });

    const topPerformance = timeSegments.reduce((best20, interval, index) => {
      interval.forEach( second => {
        let power = second.values.power      
        if (second.values.power === highestPower) {
          best20.push(...interval);
        }
      }); 
      return best20;
    }, []);

    return topPerformance;
  }

  gpsRoute = (workoutData = this.fullWorkoutData) => {
    const startPoint = workoutData.slice(5, workoutData.length);
    const gps = startPoint.map((second, index, array) => {
      let lat = second.values.positionLat;
      let lng = second.values.positionLong;

      if (lat === undefined || lng === undefined) {
        lat = array[index-1].values.positionLat;
        lng = array[index-1].values.positionLong;
      }

      return {
        lat,
        lng
      }
    });
    return gps;
  }

  performanceData = topPerformance => {
    const output = topPerformance.map(second => {
      let seconds = second.millisecondOffset / 1000 / 60; 
      return {
        time: seconds,
        power: second.values.power
      }
    }); 

    return output;
  }

}

export default AnalysisData;





