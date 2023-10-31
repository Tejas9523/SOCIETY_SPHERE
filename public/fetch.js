fetch("users.json")
    .then(function (response) {
        return response.json();
    })
    .then(function (products) {
        let placeholder = document.querySelector("#data-output");
        let out = "";
        for (let product of products) {
            out += `
         <tr>
            <td>${product.Name}</td>
            <td>${product.Plot}</td>
            <td>${product.Wing}</td>
            <td>${product.Flat}</td>
            <td>${product.Email}</td>
            <td>${product.Phone}</td>
            <td>${product.Members}</td>
            <td>${product.Type}</td>
            <td>${product.Date}</td>
         </tr>
      `;
        }

        placeholder.innerHTML = out;
    });
