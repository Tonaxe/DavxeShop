using DavxeShop.Models.dbModels;
using DavxeShop.Models.models;
using DavxeShop.Models.Request.User;
using DavxeShop.Models.Response;

namespace DavxeShop.Persistance.Interfaces
{
    public interface IDavxeShopDboHelper
    {
        List<User> GetUsers();
        UserBasicDto GetUser(int UserId);
        User? GetUserByEmail(string email);
        bool UserExists(string Name, string Email, string DNI);
        bool SaveUser(User requestHashed);
        bool CorrectUser(LogInRequest request);
        string GetUserPasswordByEmail(string email);
        int? GetUserId(string email);
        bool StoreSession(Session session);
        bool LogOut(string token);
        string GetTokenById(int userId);
        bool SaveRecoveryCode(int Userid, string code, string email);
        bool VerifyRecoveryCode(VerifyRecoverPasswordRequest request);
        bool ResetPassword(ResetPasswordRequest request);
        bool ValidToken(string token);
        bool UserExistsById(int userId);
        bool AddProduct(AgregarProductoDTO producto);
        List<ProductoDTO> GetProductosByUserId(int userId);
        List<ProductoDTO> GetRandomProductos();
        List<CategoriaDTO> GetAllCategorias();
        List<UserProductsDTO> GetRandomProductosUsers();
        ProductoDTO? GetProductosByProductoId(int productoId);
        List<EstadoDTO> GetAllEstados();
        List<ProductoDTO> GetProductosByCategoria(int categoriaId);
        List<ProductoDTO> GetSearchedProducts(string query);
        Compra CrearCompra(CrearCompraDto crearCompra);
        bool UpdateUserProfile(UpdateProfileDto profileDto);
        Conversacion CrearConversacion(int compradorId, int vendedorId);
        List<ConversacionDto> ObtenerConversacionesDeUsuario(int userId);
        Conversacion? ObtenerConversacionConMensajes(int conversacionId, int userId);
        Mensaje EnviarMensaje(int remitenteId, int conversacionId, string contenido);
        bool EliminarConversacion(int conversacionId, int userId);
        Conversacion? ObtenerConversacionExistente(int compradorId, int vendedorId);
        bool EliminarMensaje(int mensajeId);
        int ObtenerConversacionIdPorMensajeId(int mensajeId);
        bool EditarMensaje(int mensajeId, EditarMensajeDto dto);
        bool EditProduct(ProductoDTO producto);
        bool DeleteProduct(int productId);
    }
}
