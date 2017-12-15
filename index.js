/**
 * Created by soysauce on 11/14/17.
 */
$(document).ready(function(){
    $(this.classCalc).bind(this);
    console.log('calculator made',classCalc);
    classCalc.applyClickHandlers(this);
});

class CalculatorClass {

    constructor(){
        this.last = 0;
        this.inputArray = [''];
        this.decimal_flag = false;
        this.applyClickHandlers();
    }

    applyClickHandlers(){
        $('.number_button').on('click', this.inputNumbers.bind(this));
        $('.operator_button').on('click', this.inputOperator.bind(this));
        $('.decimal_button').on('click', this.inputNumbers.bind(this));
        $('.equals_button').on('click', this.doMath.bind(this));
        $('.clear_reset').on('click', this.clearAll.bind(this));
        // $('.clear_entry').on('click', this.clearEntry.bind(this));
    }
    
    displayValue(inArr) {
        let displayArray = this.inputArray ;
        let resultArray = [inArr];
        console.log('inArr',inArr);
        let resultInput = resultArray.join("");
        let displayInput = displayArray.join("");
        resultArray.length < 0 ? $('.calculated_result_screen').text(resultInput) : $('.calculated_result_screen').text(displayInput);
        console.log('display value called(displayArray):', displayArray);
        console.log('display value called(resultArray):', resultArray);
    }

    inputNumbers() {
        let input = event.target.innerHTML;
        let decimal_flag = true;
        input === '.'? this.inputArray[this.inputArray.length-1] += input : 'no';  
        // this.inputArray[this.inputArray.length-1] += input;
        this.displayValue();
        console.log('input:',input);
        console.log('inputNum called and inputArray is:',this.inputArray);
    }

    inputOperator() {
        let input = event.target.innerHTML;
        let inArr = this.inputArray;
        let lastInput = inArr.length-1;

        console.log('inputOperator-fcn called:',input);

        //if something in input and and last input is NOT a operator
        if (!isNaN(inArr[lastInput]) && inArr.length > 0) {
            inArr.push(input,'' );
            // this.operatorInput.push(input);
            this.displayValue();
            console.log('input /no existing operator:', inArr);
            console.log(this.inputArray[lastInput]);
        }

        // //if something at the end of array is operator
        if (isNaN(inArr[lastInput])){
            inArr.splice(lastInput,1,input);
            console.log('remove last op input:', inArr);
            this.displayValue();
        }

    }

    addDecimal() {
        let input = $(event.target).text();
        let lastInput = this.inputArray.length - 1;

        if (input === '.' && this.decimal_flag === false) {
            this.inputArray.push(input);
            this.decimal_flag = true;
            this.displayValue();
        }

        if (this.inputArray[lastInput] === input && this.decimal_flag === true) {
            console.log('there is a decimal at the end of input');
        }
    }

    doMath(){
        let inArr = [...this.inputArray];
        let inArr1 = [ ];

        const signOp = { add : '+', min : '-'};
        const primeOp = { multi : '*', div :'/'};
        const {add,min} = signOp;
        const {multi,div} = primeOp;

        const calculate = {
            '+': function (x, y) { return (x + y) },
            '-': function (x, y) { return (x - y)},
            '*': function (x, y) { return (x * y) },
            '/': function (x, y) { return (x / y) }
        };

        //future function = add a function that checks the array for the parenthesis
        //check if the input that called the doMath function passes some params

        const addMinFilter = inArr.filter(val =>{ return val.valueOf() ? val === '+' || val === '-': 'error'});
        const {...am} = addMinFilter;
        let j = 0;


        const multiDivFilter = inArr.filter(val => {return val.valueOf() ? val === '*' || val === '/' : 'error'});
        const {...mv} = multiDivFilter;
        let i = 0 ;

        while(inArr.length > 1 ) {
            inArr1 =
                inArr.forEach(val => {
                    let opIndex = inArr.indexOf(val);
                    let xPosition = inArr.indexOf(inArr[opIndex - 1]);
                    let x = parseInt(inArr[opIndex - 1]);
                    let y = parseInt(inArr[opIndex + 1]);
                    //if this is operator and there is something in the filter matching * or / and there is something in filter 2
                    if (isNaN(val) && addMinFilter.length >= 0) {
                        if(multiDivFilter[i] === val){
                            let sum = parseFloat(calculate[val](x, y));
                            inArr.splice(xPosition, 3, sum.toString());
                            i++;
                            console.log('((1)(*-))--inArr:', inArr);
                        }
                        //if val is operator and the fitst item in this filter is equal to val and var 'i' went thru the filter array
                        if (isNaN(val) && addMinFilter[j] === val && i === multiDivFilter.length) {
                            console.log('val2:', val);
                            let sum = calculate[val](x, y);
                            inArr.splice(xPosition, 3, sum.toString());
                            j++;
                            console.log('((2)(+-))--inArr1:', inArr);
                            return inArr;
                        }
                    }
                    //if there is operator and there is only + and - no multi div
                    if (isNaN(val) && addMinFilter[j] === val && multiDivFilter.length === 0) {
                        console.log('val2:', val);
                        let sum = calculate[val](x, y);
                        inArr.splice(xPosition, 3, sum.toString());
                        console.log('((3)just(+-))--inArr:', inArr);
                        return inArr;
                    }
                    console.log('inArr', inArr);
                    return inArr;
                });
            console.log('inArr1:', inArr);
        }
        console.log('inArr1(out of while loop):', inArr);
        this.inputArray = [inArr];
        this.displayValue(inArr);
        return inArr;

    }

    clearAll(){
        this.inputArray = [''];
        this.displayValue();
    }

    // clearEntry(){}
}

classCalc = new CalculatorClass();