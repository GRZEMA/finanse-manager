const ulIncome = document.querySelector('.income ul')
const ulSpendings = document.querySelector('.spendings ul')

const addTransaction = document.querySelector('.add-transaction')
const deleteAllTransactions = document.querySelector('.delete-all')
const balance = document.querySelector('.balance')

const darkModeBtn = document.querySelector('.dark-mode')
const lightModeBtn = document.querySelector('.light-mode')

const popup = document.querySelector('.popup')
const cancel = document.querySelector('.cancel')
const save = document.querySelector('.save')
const name = document.querySelector('#name')
const amount = document.querySelector('#amount')
const category = document.querySelector('#category')
const error = document.querySelector('.error')

const root = document.querySelector(':root')

const changeToDarkTheme = () => {
	root.style.setProperty('--main-background-color', 'rgb(27, 31, 51)')
	root.style.setProperty('--second-background-color', 'rgb(255, 255, 255)')
	root.style.setProperty('--main-color', 'rgb(255, 255, 255)')
	root.style.setProperty('--second-color', 'rgb(0, 0, 0)')
}

const changeToLightTheme = () => {
	root.style.setProperty('--main-background-color', 'rgb(255, 255, 255)')
	root.style.setProperty('--second-background-color', 'rgb(27, 31, 51)')
	root.style.setProperty('--main-color', 'rgb(0, 0, 0)')
	root.style.setProperty('--second-color', 'rgb(255, 255, 255)')
}

const showPopup = () => {
	popup.classList.toggle('active')
}

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

const clearForm = () => {
	name.value = ''
	amount.value = ''
	category.value = ''
	error.style.visibility = 'hidden'
}

const addNewTransaction = (li, amount) => {
	const del = false
	if (amount.slice(0, 1) === '-') {
		ulSpendings.append(li)
	} else {
		ulIncome.append(li)
	}
	balanceCheck(amount, del)
}

const balanceCheck = (amount, del) => {
	if (del === false) {
		balance.textContent = (parseFloat(balance.textContent) + parseFloat(amount)).toFixed(2)
	} else if (del === true) {
		balance.textContent = (parseFloat(balance.textContent) - parseFloat(amount)).toFixed(2)
	}
}

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

	const nameP = document.createElement('p')
	nameP.classList.add('name')
	nameP.textContent = name

	const liEnd = document.createElement('div')
	liEnd.classList.add('li-end')

	const amountP = document.createElement('p')
	amountP.classList.add('amount')
	amountP.textContent = amount + 'zł'

	const deleteBtn = document.createElement('button')
	deleteBtn.classList.add('delete')
	deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>'

	li.append(liStart)
	liStart.append(nameP)
	li.append(liEnd)
	liEnd.append(amountP)
	liEnd.append(deleteBtn)

	deleteBtn.addEventListener('click', e => {
		e.target.closest('li').remove()
		const del = true
		balanceCheck(amount, del)
	})

	addNewTransaction(li, amount)
}

const deleteAll = () => {
	const allLi = document.querySelectorAll('.transactions li')
	allLi.forEach(liItem => liItem.remove())
	balance.textContent = 0
}

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
