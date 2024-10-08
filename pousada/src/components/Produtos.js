import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from 'axios';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import { Dropdown } from 'primereact/dropdown';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import Header from './Header';
import Header_user from './Header_user';
import Footer from './Footer';
import { useParams } from 'react-router-dom';





export default function Produtos() {
    let emptyProduct = {
        id: null,
        tipo_producto: null,
        nome: '',
        quantidade: '',
        quantidade_minima: '',
        lt_kl_unid: '',
        marca: '',
        saida: '',
        nova_saida: '',
        status: '0'
    };


    const [products, setProducts] = useState(null);
    const [productDialog, setProductDialog] = useState(false);
    const [saidaDialog, setSaidaDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
    const [product, setProduct] = useState(emptyProduct);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [categorias, setCategorias] = useState([]);
    const [saidas, setSaidas] = useState([]);
    const [dialogVisible, setDialogVisible] = useState(false);
    const toast = useRef(null);
    const dt = useRef(null);
    const { flag } = useParams();




    const tipo_compra = [
        { name: 'Kilos', value: 'Kilos' },
        { name: 'Litros', value: 'Litros' },
        { name: 'Unidades', value: 'Unidades' }
    ];

    useEffect(() => {
        axios.get('http://localhost:8080/produtos')
            .then(response => setProducts(response.data));
    }, [product]);


    useEffect(() => {
        axios.get('http://localhost:8080/categorias')
            .then(response => setCategorias(response.data));
    }, []);

    useEffect(() => {
        axios.get('http://localhost:8080/saidas')
            .then(response => setSaidas(response.data));
    }, [product]);




    const openNew = () => {
        setProduct(emptyProduct);
        setSubmitted(false);
        setProductDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setProductDialog(false);
        setSaidaDialog(false);
    };

    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    };

    const hideDeleteProductsDialog = () => {
        setDeleteProductsDialog(false);
    };




    const saveProduct = () => {
        setSubmitted(true);



        if (!product.nome || !product.quantidade || !product.quantidade_minima || !product.lt_kl_unid || !product.marca || !product.tipo_producto) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Campo em branco', life: 4000 });


        } else {

            let _products = [...products];
            let _product = { ...product };
            if (product.id && product.status < 0 || product.quantidade_minima < 0) {
                toast.current.show({ severity: 'error', summary: 'Error', detail: 'Não use quantidades negativas', life: 4000 });


            } else if (product.id && product.status >= 0 && product.quantidade_minima >= 0) {

                axios.put('http://localhost:8080/produtos/update/' + product.id, _product)
                    .then(response => {
                        {/*console.log(_product);*/ }
                        toast.current.show({ severity: 'success', summary: 'Sucesso', detail: 'Item Atualizado', life: 3000 });
                    })
                    .catch(error => {
                        toast.current.show({ severity: 'error', summary: 'Error', detail: error.response.data.message, life: 3000 });
                        console.log(error);
                    });




            } else {

                if (product.quantidade < 0 || product.quantidade_minima < 0) {
                    toast.current.show({ severity: 'error', summary: 'Error', detail: 'Não use quantidades negativas', life: 4000 });

                } else {

                    axios.post('http://localhost:8080/produtos/create', _product)
                        .then(response => {
                            console.log(_product);
                            toast.current.show({ severity: 'success', summary: 'Sucesso', detail: 'Item criado !!', life: 3000 });
                        })
                        .catch(error => {
                            toast.current.show({ severity: 'error', summary: 'Error', detail: error.response.data.message, life: 3000 });
                            console.log(error);
                        });

                }

            }

            setProduct(emptyProduct);
            setProductDialog(false);
            setProducts(_products);



        }


    };



    const saveSaida = () => {
        setSubmitted(true);
        let _product = { ...product };

        console.log(product);


        if (product.nova_saida < 0) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Não use quantidades negativas', life: 4000 });

        } else {


            axios.put('http://localhost:8080/produtos/update/' + product.id, _product, _product.bandeira = 1, _product.saida = _product.nova_saida)
                .then(response => {

                    toast.current.show({ severity: 'success', summary: 'Sucesso', detail: 'Saida cadastrada', life: 3000 });
                })
                .catch(error => {
                    console.log(error);
                });


            setSaidaDialog(false);
            setProduct(emptyProduct);


        }
    };



    const editProduct = (product) => {
        setProduct({ ...product });
        setProductDialog(true);
    };

    const mostrarSaidas = (product) => {
        setProduct({ ...product });
        setDialogVisible(true)
    };

    const saidaProdut = (product) => {
        setProduct({ ...product });
        setSaidaDialog(true);
    };

    const confirmDeleteProduct = (product) => {
        setProduct(product);
        setDeleteProductDialog(true);

    };


    /**********FILTRANDO AS SAIDAS POR PRODUTO SELECCIONADO ***** */
    const selectProdu = saidas.filter(data => data.nome === product.nome);;
    /***************************************************** ***** */

    const deleteProduct = () => {

        let _product = { ...product };


        axios.delete('http://localhost:8080/produtos/' + _product.id)
            .then(response => {

                toast.current.show({ severity: 'success', summary: 'Sucesso', detail: 'Item excluído', life: 3000 });
            })
            .catch(error => {
                console.log(error);
            });

        setDeleteProductDialog(false);
        setProduct(emptyProduct);
        setProduct(_product);

    };


    const deleteSelectedProducts = () => {
        let ids = [];
        ids = selectedProducts.map(item => (item.id))


        axios.delete('http://localhost:8080/items/produtos', { data: { ids: ids } })
            .then(response => {

                toast.current.show({ severity: 'success', summary: 'Sucesso', detail: 'Items excluídos', life: 3000 });

            })
            .catch(error => console.error(error));

        setDeleteProductsDialog(false);
        setSelectedProducts(null);
        setProduct(emptyProduct);

    };



    const exportCSV = () => {
        dt.current.exportCSV();
    };



    const confirmDeleteSelected = () => {
        setDeleteProductsDialog(true);
    };


    const onInputChange = (e, nome) => {
        const val = (e.target && e.target.value) || '';


        let _product = { ...product };

        _product[`${nome}`] = val;

        setProduct(_product);

    };



    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <Button className="btn btn-outline-success btn-md" label="Criar" icon="pi pi-plus" severity="success" onClick={openNew} />
                &nbsp;  &nbsp;  &nbsp;  &nbsp;
                <Button className="btn btn-outline-danger btn-md" label="Apagar" icon="pi pi-trash" severity="danger" disabled={!selectedProducts || !selectedProducts.length} onClick={confirmDeleteSelected} />
            </div>
        );
    };

    const rightToolbarTemplate = () => {
        return <Button label="Exportar" icon="pi pi-upload" className="btn btn-outline-info btn-md" onClick={exportCSV} />;

    };

    const centerToolbarTemplate = () => {
        return <h4 class="display-7"> Produtos <i class="fas fa-shopping-cart"></i></h4>
    };


    const actionBodyTemplate = (product) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-upload" rounded outlined severity="warning" className=" btn btn-outline-warning btn-sm" onClick={() => saidaProdut(product)} />
                &nbsp;
                <Button icon="pi pi-list" rounded outlined severity="warning" className=" btn btn-outline-warning btn-sm" onClick={() => mostrarSaidas(product)} />
                &nbsp;
                <Button icon="pi pi-pencil" rounded outlined className=" btn btn-outline-info btn-sm" onClick={() => editProduct(product)} />
                &nbsp;
                <Button icon="pi pi-trash" rounded outlined severity="danger" className=" btn btn-outline-danger btn-sm" onClick={() => confirmDeleteProduct(product)} />


            </React.Fragment>
        );
    };


    const statusBodyTemplate = (product) => {
        return <Tag value={product.status} severity={getSeverity(product)}></Tag>;
    };



    const getSeverity = (product) => {

        if (product.status > product.quantidade_minima) {
            return 'success';
        } else if (product.status <= product.quantidade_minima) {
            return 'danger';
        }
    };

    const header = (
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between">


            <IconField iconPosition="left" >
                <InputIcon className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Buscar..." />
            </IconField>

        </div>
    );
    const productDialogFooter = (
        <React.Fragment>
            <Button label="Cancelar" className="btn btn-outline-danger btn-sm" icon="pi pi-times" onClick={hideDialog} />
            &nbsp;
            <Button label="Salvar" className="btn btn-outline-success btn-sm" icon="pi pi-check" onClick={saveProduct} />
        </React.Fragment>
    );
    const saidatDialogFooter = (
        <React.Fragment>
            <Button label="Cancelar" className="btn btn-outline-danger btn-sm" icon="pi pi-times" outlined onClick={hideDialog} />
            &nbsp;
            <Button label="Salvar" className="btn btn-outline-success btn-sm" icon="pi pi-check" disabled={!product.nova_saida || product.nova_saida > product.status} onClick={saveSaida} />
        </React.Fragment>
    );
    const deleteProductDialogFooter = (
        <React.Fragment>
            <Button label="Não" className="btn btn-outline-danger btn-sm" icon="pi pi-times" outlined onClick={hideDeleteProductDialog} />
            &nbsp;
            <Button label="Sim" className="btn btn-outline-success btn-sm" icon="pi pi-check" severity="danger" onClick={deleteProduct} />
        </React.Fragment>
    );
    const deleteProductsDialogFooter = (
        <React.Fragment>
            <Button label="Não" className="btn btn-outline-danger btn-sm" icon="pi pi-times" outlined onClick={hideDeleteProductsDialog} />
            &nbsp;
            <Button label="Sim" className="btn btn-outline-success btn-sm" icon="pi pi-check" severity="danger" onClick={deleteSelectedProducts} />
        </React.Fragment>
    );

    const dialogFooterTemplate = () => {
        return <Button label="Ok" icon="pi pi-check" onClick={() => setDialogVisible(false)} />;
    };

    const dataTable = {
        margin: "auto",
        padding: "10px",
        Width: '100%'


    };



    const footer = `Total de ${products ? products.length : 0} produtos cadastrados.`;
    const footer_saidas = `Total de ${selectProdu ? selectProdu.length : 0} saidas efetuadas.`;

    return (
        <div>

            {flag === '1' ? <Header /> : <Header_user />}
            <Toast ref={toast} />
            <br />

            <div style={dataTable}>

                <div className="card">
                    <Toolbar className="mb-4" left={leftToolbarTemplate} center={centerToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                    <DataTable ref={dt} footer={footer} value={products} stripedRows selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)}
                        dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]} className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Página {first} de {last} a {totalRecords} produtos" globalFilter={globalFilter} header={header} resizableColumns showGridlines>
                        <Column selectionMode="multiple" exportable={false}></Column>
                        <Column body={(rowData, { rowIndex }) => rowIndex + 1} header="#" sortable style={{ minWidth: '3rem' }}></Column>
                        <Column field="tipo_producto" header="Categoria" sortable style={{ minWidth: '6rem' }}></Column>
                        <Column field="nome" header="Nome" sortable style={{ minWidth: '6rem' }}></Column>
                        {/*<Column field="quantidade" header="Quant." sortable style={{ minWidth: '100px' }}></Column>*/}
                        <Column field="lt_kl_unid" header="LT-KL-UNID" sortable style={{ minWidth: '6rem' }}></Column>
                        <Column field="marca" header="Marca" sortable style={{ minWidth: '6rem' }}></Column>
                        <Column field="createdAt" header="Criado" sortable style={{ minWidth: '5rem' }}></Column>
                        <Column field="updatedAt" header="Editado" sortable style={{ minWidth: '100px' }}></Column>
                        <Column field="status" header="Status" body={statusBodyTemplate} sortable style={{ minWidth: '6rem' }}></Column>
                        <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '9rem' }}></Column>

                    </DataTable>

                </div>
            </div>
            {/************************************************************** MODALES ***************************************************************** */}


            <Dialog visible={productDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Produto" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>


                <div className="field">
                    <label htmlFor="senha" className="font-bold">
                        Categoria de Produto:
                    </label>


                    <select id="tipo_producto" class="form-select" value={product.tipo_producto} onChange={(e) => onInputChange(e, 'tipo_producto')} required >
                        <option selected value=""></option>
                        {categorias.map(option => (
                            <>

                                <option value={option.nome}>{option.nome}</option>

                            </>
                        ))}
                    </select>
                </div>

                <div className="field">
                    <label htmlFor="name" className="font-bold">
                        Nome:
                    </label>
                    <InputText id="nome" value={product.nome} onChange={(e) => onInputChange(e, 'nome')} className={classNames({ 'p-invalid': submitted && !product.nome })} />
                    {submitted && !product.nome && <small className="p-error">Campo é obrigatório.</small>}
                </div>
                <div className="field">

                    {product.id ?
                        <>
                            <label htmlFor="quantidade" className="font-bold">
                                Quantidade atual no estoque:
                            </label>

                            <InputText type="number" id="status" value={product.status} onChange={(e) => onInputChange(e, 'status')} equired rows={2} cols={20} className={classNames({ 'p-invalid': submitted && !product.status })} />
                            {submitted && !product.status && <small className="p-error">Campo é obrigatório.</small>}
                        </>
                        :
                        <><label htmlFor="quantidade" className="font-bold">
                            Quantidade em estoque:
                        </label>
                            <InputText type="number" id="quantidade" value={product.quantidade} onChange={(e) => onInputChange(e, 'quantidade')} rows={2} cols={20} className={classNames({ 'p-invalid': submitted && !product.quantidade })} />
                            {submitted && !product.quantidade && <small className="p-error">Campo é obrigatório.</small>}
                        </>
                    }

                </div>

                <div className="field">

                    <label htmlFor="quantidade_minima" className="font-bold">
                        Quantidade para gerar alerta de baixo estoque:
                    </label>
                    <InputText type="number" id="quantidade_minima" value={product.quantidade_minima} min={0} onChange={(e) => onInputChange(e, 'quantidade_minima')} equired rows={2} cols={20} className={classNames({ 'p-invalid': submitted && !product.quantidade_minima })} />
                    {submitted && !product.quantidade_minima && <small className="p-error">Campo é obrigatório.</small>}


                </div>

                <div className="field">
                    <label htmlFor="senha" className="font-bold">
                        Tipo de Unidade:
                    </label>
                    <Dropdown id="lt_kl_unid" options={tipo_compra} optionLabel="name" required autoFocus value={product.lt_kl_unid} onChange={(e) => onInputChange(e, 'lt_kl_unid')} className={classNames({ 'p-invalid': submitted && !product.lt_kl_unid })} />
                    {submitted && !product.lt_kl_unid && <small className="p-error">Campo é obrigatório.</small>}
                </div>
                <div className="field">
                    <label htmlFor="name" className="font-bold">
                        Marca do Produto:
                    </label>
                    <InputText id="marca" value={product.marca} onChange={(e) => onInputChange(e, 'marca')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.marca })} />
                    {submitted && !product.marca && <small className="p-error">Campo é obligatorio.</small>}
                </div>



            </Dialog>


            <Dialog visible={saidaDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Saida de Produto" modal className="p-fluid" footer={saidatDialogFooter} onHide={hideDialog}>


                <div className="field">
                    <label htmlFor="senha" className="font-bold">
                        Categoria de Produto:
                    </label>
                    <select disabled id="tipo_producto" class="form-select" value={product.tipo_producto} onChange={(e) => onInputChange(e, 'tipo_producto')}>
                        {categorias.map(option => (
                            <>

                                <option value={option.nome}>{option.nome}</option>

                            </>
                        ))}
                    </select>
                </div>

                <div className="field">
                    <label htmlFor="name" className="font-bold">
                        Nome:
                    </label>
                    <InputText disabled id="nome" value={product.nome} onChange={(e) => onInputChange(e, 'nome')} required className={classNames({ 'p-invalid': submitted && !product.nome })} />

                </div>

                <div className="field">
                    <label htmlFor="name" className="font-bold">
                        Marca do produto:
                    </label>
                    <InputText disabled id="marca" value={product.marca} onChange={(e) => onInputChange(e, 'marca')} required autoFocus />

                </div>
                <div className="field">


                    <label htmlFor="quantidade" className="font-bold">
                        Quantidade atual no estoque:
                    </label>
                    <InputText disabled type="number" id="status" value={product.status} onChange={(e) => onInputChange(e, 'status')} equired rows={2} cols={20} />


                </div>


                <div className="field">
                    <label htmlFor="name" className="font-bold">
                        Quantidade de Saída:
                    </label>
                    <InputText type="number" id="nova_saida" name="nova_saida" onChange={(e) => onInputChange(e, 'nova_saida')} required autoFocus />
                    {product.nova_saida > product.status ?
                        <small className="p-error pi pi-exclamation-triangle mr-3"> Não há quantidade sufuciente para saída! </small>

                        :

                        <small></small>}
                </div>



            </Dialog>

            <Dialog visible={deleteProductDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirmar" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem', color: 'red' }} />
                    {product && (
                        <span>
                            Tem certeza de que quer excluir o Item: <b>{product.nome}</b>?
                        </span>
                    )}
                </div>
            </Dialog>

            <Dialog visible={deleteProductsDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirmar" modal footer={deleteProductsDialogFooter} onHide={hideDeleteProductsDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem', color: 'red' }} />
                    {product && <span>Tem certeza na exclusão dos itens selecionados ?</span>}
                </div>
            </Dialog>

            <Dialog header="Saidas por produto:" visible={dialogVisible} style={{ width: '92vw' }} maximizable
                modal contentStyle={{ height: '450px' }} onHide={() => setDialogVisible(false)} footer={dialogFooterTemplate}>
                <Toolbar className="mb-4" right={rightToolbarTemplate}></Toolbar>

                <DataTable value={selectProdu} scrollable scrollHeight="flex" tableStyle={{ Width: '50rem' }} className="datatable-responsive" footer={footer_saidas} >
                    <Column field="tipo_producto" header="Categoria"></Column>
                    <Column field="nome" header="Nome" style={{ minWidth: '5rem' }}></Column>
                    <Column field="lt_kl_unid" header="LT-KL-UNID" style={{ minWidth: '5rem' }}></Column>
                    <Column field="marca" header="Marca" style={{ minWidth: '5rem' }}></Column>
                    <Column field="saida" header="Saidas" sortable style={{ minWidth: '5rem' }}></Column>
                    <Column field="updatedAt" header="Data saida" sortable style={{ minWidth: '5rem' }}></Column>

                </DataTable>
            </Dialog>


            <Footer />
        </div>
    );
}
