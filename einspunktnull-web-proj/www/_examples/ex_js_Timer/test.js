$(function()
{
    var timer = new einspunktnull.Timer(1000, 5);
    timer.addEventListener('timer', onTimer, 'affe1', 1);
    timer.addEventListener('timerComplete', onTimerComplete, 'affe2', 2);
    timer.start();
});

function onTimer(param1, param2)
{
    console.log("onTimer", param1, param2);
}

function onTimerComplete(param1, param2)
{
    console.log("onTimerComplete", param1, param2);
}
