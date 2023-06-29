const textarea1 = document.querySelector('#textarea1')
const textarea2 = document.querySelector('#textarea2')

const unit1 = document.querySelector('#unit1')
const unit2 = document.querySelector('#unit2')

const label1 = document.querySelector('#label1')
const label2 = document.querySelector('#label2')

const handlingValue = (unit1, unit2, label1, label2) => {
    if(unit1.value == 'binary'){
        unit2.value = 'text'
        label1.textContent = `Paste ${unit1.value}`
        label2.textContent = `Paste ${unit2.value}`
    } 
    if(unit1.value == 'text'){
        unit2.value = 'binary'
        label1.textContent = `Paste ${unit1.value}`
        label2.textContent = `Paste ${unit2.value}`
    }

}

unit1.addEventListener('change', () => {
    handlingValue(unit1, unit2,label1, label2)
})

unit2.addEventListener('change', () => {
    handlingValue(unit2, unit1,label2, label1)

})

const qraphqlToBiner = {
    query :
    `{
        toBainery(text: ""){
            value
        }
    }
    `
        
}

const convertValue = async () => {

    let qraphqlToBiner = {
        query :
        `{
            toBainery(text: "${textarea1.value}"){
                value
            }
        }
        `
            
    }
    if(unit1.value == 'binary'){
        qraphqlToBiner = {
            query :
            `{
                formatBainery(value: "${textarea1.value}"){
                    value
                }
            }
            `

        }

    }
    try {
        const result = await fetch('http://localhost:8080/graphql', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(qraphqlToBiner)
    
        })
        const resData = await result.json()

        let resDataField = 'toBainery'
        if(unit1.value == 'binary'){
            resDataField = "formatBainery"

        }
        textarea2.value = resData.data[resDataField].value
      } catch (error) {
        throw new Error(error)
      }
}

const swapSelections = (selection, label,) => {
    handlingValue
    if(selection.value == 'text'){
        selection.value = 'binary'
        label.textContent = 'binary'
    }else{
        selection.value = 'text'
        label.textContent = 'text'
    }

}

const reverseText = () => {
    if(unit1.value == unit2.value){
        throw new Error('nie mogoą być takie same wartości ')
    }
    if(unit1.value == 'binary'){
        unit1.value = 'text'
        unit2.value = 'binary'
        label2.textContent = `Paste ${unit2.value}`
        label1.textContent = `Paste ${unit1.value}`

    }else if(unit1.value == 'text'){
        unit1.value = 'binary'
        unit2.value = 'text'
        label2.textContent = `Paste ${unit2.value}`
        label1.textContent = `Paste ${unit1.value}`
    }
    reset()

}

const reset = () => {
    textarea1.value = ''
    textarea2.value = ''
}

