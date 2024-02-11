document.addEventListener('DOMContentLoaded', function ()
{
    const host = window.location.host;
	const appender = new Appender(host);
	const linkAppender = new LinkCoder(appender);
	Nodes.decode('.email', linkAppender);
});


// Appender

function Appender (host)
{
	this.host = host;
}

Appender.prototype.decode = function (user)
{
	return user + '@' + this.host;
}

Appender.prototype.encode = function (email)
{
	const end = -1 * (this.host.length + 1);

	return email.slice(0, end);
}


// LinkCoder

function LinkCoder (coder)
{
	this.coder = coder;
}

LinkCoder.prototype.encode = function (a)
{
	this.apply('encode', a);
}

LinkCoder.prototype.decode = function (a)
{
	this.apply('decode', a);
}

LinkCoder.prototype.apply = function (action, a)
{
	const input = a.getAttribute('href');
	const output = this.coder[action](input);

	a.setAttribute('href', output);
}


// Nodes

Nodes = {};

Nodes.decode = function (selector, coder)
{
	const nodes = document.querySelectorAll(selector);
	const method = coder.decode.bind(coder);

	nodes.forEach(method);
}
