import { useEffect, useState } from 'react';
function CountdownTimer(){
    const [current_month, setCurrentMonth] = useState(new Date());
    const [expiry_month, setExpiryMonth] = useState(11);
    const [expiryTime, setExpiryTime] = useState(new Date(2022, expiry_month, 1, 18, 0, 0));
    const [countdownTime, setCountdownTime]= useState(
        {
            countdownDays:'',
            countdownHours:'',
            countdownlMinutes:'',
            countdownSeconds:''
        }
    );
    const countdownTimer=()=>{

        const timeInterval= setInterval(() => {
            const countdownDateTime = new Date(expiryTime).getTime();
            const currentTime = new Date().getTime();
            const remainingDayTime = countdownDateTime - currentTime;
            const totalDays = Math.floor(remainingDayTime / (1000 * 60 * 60 * 24));
            const totalHours = Math.floor((remainingDayTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const totalMinutes = Math.floor((remainingDayTime % (1000 * 60 * 60)) / (1000 * 60));
            const totalSeconds = Math.floor((remainingDayTime % (1000 * 60)) / 1000);

            const runningCountdownTime={
                countdownDays: totalDays,
                countdownHours: totalHours,
                countdownMinutes: totalMinutes,
                countdownSeconds: totalSeconds
            }

            setCountdownTime(runningCountdownTime);

            if (remainingDayTime < 0) {
                clearInterval(timeInterval);
                setExpiryTime(false);
            }

        }, 1000);
    }

    useEffect(() => {
        if (current_month.getDay() == 1 && current_month.getHours() < 18)
        {
            setExpiryMonth(current_month.getMonth());
        }
        else {
            setExpiryMonth(current_month.getMonth() + 1);
        }

    },[]);
    useEffect(() => {
        countdownTimer();

    });

    return(
        <div className="row text-center align-items-center justify-content-center">
            <div className="col-sm-6">
                <h4>The next Winner will be drawn in</h4>
                <div className="btn-group my-3">
                    {expiryTime!==false?
                        <>
                            <button type="button" className="btn btn-outline-danger">{countdownTime.countdownDays} <sub>Days</sub></button>
                            <button type="button" className="btn btn-danger">:</button>
                            <button type="button" className="btn btn-outline-danger">{countdownTime.countdownHours} <sub>Hours</sub></button>
                            <button type="button" className="btn btn-danger">:</button>
                            <button type="button" className="btn btn-outline-danger">{countdownTime.countdownMinutes} <sub>Minutes</sub></button>
                            <button type="button" className="btn btn-danger">:</button>
                            <button type="button" className="btn btn-outline-danger">{countdownTime.countdownSeconds} <sub>Seconds</sub></button>
                        </>
                        :<p>Deal has been Expired</p>}
                </div>
            </div>
        </div>
    )
}
export default CountdownTimer;