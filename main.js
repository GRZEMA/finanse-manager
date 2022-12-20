// ul lists
const ulIncome = document.querySelector('.income ul')
const ulSpendings = document.querySelector('.spendings ul')

// main btns
const addTransaction = document.querySelector('.add-transaction')
const deleteAllTransactions = document.querySelector('.delete-all')
const balance = document.querySelector('.balance')

// style btns
const darkModeBtn = document.querySelector('.dark-mode')
const lightModeBtn = document.querySelector('.light-mode')

// popup
const popup = document.querySelector('.popup')

// popup btns
const cancel = document.querySelector('.cancel')
const save = document.querySelector('.save')

// popup inputs
const name = document.querySelector('#name')
const amount = document.querySelector('#amount')
const category = document.querySelector('#category')

// popup error
const error = document.querySelector('.error')

// root
const root = document.querySelector(':root')

// dark theme
const changeToDarkTheme = () => {
	root.style.setProperty('--main-background-color', 'rgb(27, 31, 51)')
	root.style.setProperty('--second-background-color', 'rgb(255, 255, 255)')
	root.style.setProperty('--main-color', 'rgb(255, 255, 255)')
	root.style.setProperty('--second-color', 'rgb(0, 0, 0)')
}
// light theme
const changeToLightTheme = () => {
	root.style.setProperty('--main-background-color', 'rgb(255, 255, 255)')
	root.style.setProperty('--second-background-color', 'rgb(27, 31, 51)')
	root.style.setProperty('--main-color', 'rgb(0, 0, 0)')
	root.style.setProperty('--second-color', 'rgb(255, 255, 255)')
}
// showing popup
const showPopup = () => {
	popup.classList.toggle('active')
}

// form validator
const validateForm = () => {
	if (!(name.value === '' || amount.value === '' || category.value === 0)) {
		error.style.visibility = 'hidden'
		showPopup()
		createTransactionDetails(name.value, amount.value, category.value)
		clearForm()
	} else {
		error.style.visibility = 'visible'
	}
}

// form cleaner
const clearForm = () => {
	name.value = ''
	amount.value = ''
	category.value = ''
	error.style.visibility = 'hidden'
}

// transaction logic
const addNewTransaction = (li, category, amount) => {
	if (category === 'income') {
		ulIncome.append(li)
	} else {
		ulSpendings.append(li)
	}

	balanceCheck(amount, category)
}

const balanceCheck = (amount, category) => {
	if (category === 'income') {
		balance.textContent = (parseFloat(balance.textContent) + parseFloat(amount)).toFixed(2)
	} else {
		balance.textContent = (parseFloat(balance.textContent) - parseFloat(amount)).toFixed(2)
	}
}

// creating transation elements
const createTransactionDetails = (name, amount, category) => {
	const li = document.createElement('li')
	const liStart = document.createElement('div')
	liStart.classList.add('li-start')

	switch (category) {
		case 'income':
			liStart.innerHTML = '<i class="fa-solid fa-money-bill-wave"></i>'
			break
		case 'shopping':
			liStart.innerHTML = '<i class="fa-solid fa-cart-shopping"></i>'
			break
		case 'food':
			liStart.innerHTML = '<i class="fa-solid fa-burger"></i>'
			break
		case 'cinema':
			liStart.innerHTML = '<i class="fa-solid fa-film"></i>'
			break
	}

	// name of transaction
	const nameP = document.createElement('p')
	nameP.classList.add('name')
	nameP.textContent = name

	// first transaction container
	const liEnd = document.createElement('div')
	liEnd.classList.add('li-end')

	// amount of transaction
	const amountP = document.createElement('p')
	amountP.classList.add('amount')
	amountP.textContent = amount + 'zł'
	category === 'income' ? (amountP.textContent = amount + 'zł') : (amountP.textContent = `-${amount} zł`)

	// delete btn
	const deleteBtn = document.createElement('button')
	deleteBtn.classList.add('delete')
	deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>'

	// appending everything to li item
	li.append(liStart)
	liStart.append(nameP)
	li.append(liEnd)
	liEnd.append(amountP)
	liEnd.append(deleteBtn)

	// deletebtn event
	deleteBtn.addEventListener('click', e => {
		e.target.closest('li').remove()
		balanceCheck(amount, category)
	})

	// transforming created elements into logic check
	addNewTransaction(li, category, amount)
}

// delete all transactions history
const deleteAll = () => {
	const allLi = document.querySelectorAll('.transactions li')
	allLi.forEach(liItem => liItem.remove())
	balance.textContent = 0
}

// event listeners
darkModeBtn.addEventListener('click', changeToDarkTheme)
lightModeBtn.addEventListener('click', changeToLightTheme)
addTransaction.addEventListener('click', showPopup)
deleteAllTransactions.addEventListener('click', deleteAll)
cancel.addEventListener('click', e => {
	e.preventDefault()
	showPopup()
	clearForm()
})
save.addEventListener('click', e => {
	e.preventDefault()
	validateForm()
})
