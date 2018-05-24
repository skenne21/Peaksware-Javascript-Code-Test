class AnalysisData {
  constructor(timeParams) {
    this.timeSegments = [];
    this.secondsPast = timeParams;
  }

  spiltIntoTwentyMins(workoutData) {
    let twentyMinChuncks;

    const session = workoutData.filter( (session,index) => {
      let timePast = session.millisecondOffset;
      if (timePast === this.secondsPast) {
        session.index = index + 1;
        return session;
      }
    });

    twentyMinChuncks = workoutData.splice(0, session[0].index) 
  
    this.timeSegments.push(twentyMinChuncks);

    if (workoutData[0].millisecondOffset >= this.secondsPast) {
      workoutData.forEach( session => {
        let milliseconds = session.millisecondOffset
        session.millisecondOffset = milliseconds - this.secondsPast;
      });
    }
  
    if (workoutData.length <= 216 ) {
      const remainder = workoutData.splice(0, workoutData.length)
      this.timeSegments.push(remainder);
      return this.timeSegments;
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

  gpsRoute = workoutData => {
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











// export const timeSegments = [];

// export const spiltIntoTwentyMins = (workoutData, timeParams) => {
//   // console.log('length', workoutData.length)
//   console.log('times', timeParams)
//   console.log('workoutData', workoutData)
//   const secondsPast = timeParams;
//   let twentyMinChuncks;
//   // console.log(secondsPast)
//   const session = workoutData.filter( (session,index) => {

//     let timePast = session.millisecondOffset;
//     if (timePast === secondsPast) {
//       session.index = index + 1;
//       return session;
//     }
//   });

//   twentyMinChuncks = workoutData.splice(0, session[0].index) 
  
//   timeSegments.push(twentyMinChuncks);

//   if (workoutData[0].millisecondOffset >= secondsPast) {
//     workoutData.forEach( session => {
//       let milliseconds = session.millisecondOffset
//       session.millisecondOffset = milliseconds - secondsPast;
//     });
//   }
  
//   if(workoutData.length <= 216 ) {
//     const remainder = workoutData.splice(0, workoutData.length)
//     timeSegments.push(remainder);
//     console.log(timeSegments)
//     return timeSegments;
//   }

//   spiltIntoTwentyMins(workoutData);

// }


// export const findBest = timeSegments => {
//   let highestPower = 0;

//   timeSegments.forEach(intervals => {
//     intervals.forEach( second => {
//       let power = second.values.power
//       if (power > highestPower) {
//         highestPower = power;
//       } 
//     });
//   });

//   const topPerformance = timeSegments.reduce((best20, interval, index) => {
//     interval.forEach( second => {
//       let power = second.values.power      
//       if (second.values.power === highestPower) {
//         best20.push(...interval);
//       }
//     }); 
//     return best20;
//   }, []);

//   return topPerformance;
// }

// export const gpsRoute = workoutData => {
//   const startPoint = workoutData.slice(5, workoutData.length);
//   const gps = startPoint.map((second, index, array) => {
//     let lat = second.values.positionLat;
//     let lng = second.values.positionLong;

//     if (lat === undefined || lng === undefined) {
//       lat = array[index-1].values.positionLat;
//       lng = array[index-1].values.positionLong;
//     }

//     return {
//       lat,
//       lng
//     }
//   });
//   return gps;
// }

// export const performanceData = topPerformance => {
//   const output = topPerformance.map(second => {
//     let seconds = second.millisecondOffset / 1000 / 60;
//     return {
//       time: seconds,
//       power: second.values.power
//     }
//   }); 

//   return output;
// }




