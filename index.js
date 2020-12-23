// Your code here
let createEmployeeRecord = function(row) {
    return {
        firstName: row[0],
        familyName: row[1],
        title: row[2],
        payPerHour: row[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

let createEmployeeRecords = function(employeeRowData) {
    return employeeRowData.map(function(row) {
        return createEmployeeRecord(row)
    })
}

let createTimeInEvent = function(employeeRecord, timeString){
    let [date, hour] = timeString.split(' ')

    employeeRecord.timeInEvents.push({
        type: "TimeIn",
        date,
        hour: parseInt(hour, 10)
    })

    return employeeRecord
}

let createTimeOutEvent = function (employeeRecord, timeString) {
    let [date, hour] = timeString.split(' ')

    employeeRecord.timeOutEvents.push({
        type: "TimeOut",
        date,
        hour: parseInt(hour, 10)
    })

    return employeeRecord
}

let hoursWorkedOnDate = function(employeeRecord, date) {
    let clockIn = employeeRecord.timeInEvents.find(function(e){
        return e.date === date
    })

    let clockOut = employeeRecord.timeOutEvents.find(function(e){
        return e.date === date
    })

    return (clockOut.hour - clockIn.hour) / 100
}

let wagesEarnedOnDate = function (employee, dateSought) {
    
    let rawWage = hoursWorkedOnDate(employee, dateSought)
       * employee.payPerHour
    return parseFloat(rawWage.toString())
}

let allWagesFor = function(employeeRecord) {
    let dates = employeeRecord.timeInEvents.map(function(e){
        return e.date
    })

    let pay = dates.reduce(function(memo, d){
        return memo + wagesEarnedOnDate(employeeRecord, d)
    }, 0)

    return pay
}

let calculatePayroll = function(employeeRecords) {
    return employeeRecords.reduce(function(memo, employee){
        return memo + allWagesFor(employee)
    }, 0)
}

let findEmployeeByFirstName = function(employees, firstName) {
    return employees.find(function(employee){
        return employee.firstName === firstName
    })
}

