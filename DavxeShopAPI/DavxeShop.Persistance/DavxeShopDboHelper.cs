using DavxeShop.Models.dbModels;
using DavxeShop.Models.models;
using DavxeShop.Models.Request.User;
using DavxeShop.Models.Response;
using DavxeShop.Persistance.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DavxeShop.Persistance
{
    public class DavxeShopDboHelper : IDavxeShopDboHelper
    {
        private readonly DavxeShopContext _context;

        public DavxeShopDboHelper(DavxeShopContext context)
        {
            _context = context;
        }
        public List<User> GetUsers()
        {
            return _context.Users.ToList();
        }

        public UserBasicDto GetUser(int userId)
        {
            var user = _context.Users.FirstOrDefault(x => x.UserId == userId);

            if (user == null) return null;

            return new UserBasicDto
            {
                UserId = user.UserId,
                DNI = user.DNI,
                Name = user.Name,
                Email = user.Email,
                BirthDate = user.BirthDate,
                City = user.City,
                RolId = user.RolId,
                ImageBase64 = user.ImageBase64
            };
        }

        public User? GetUserByEmail(string email)
        {
            return _context.Users.FirstOrDefault(x => x.Email.Equals(email));
        }

        public bool UserExists(string Name, string Email, string DNI)
        {
            return _context.Users.Any(x => x.Name == Name && x.Email == Email && x.DNI == DNI);
        }

        public bool SaveUser(User requestHashed)
        {
            try
            {
                _context.Users.Add(requestHashed);
                int result = _context.SaveChanges();

                return result > 0;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public bool CorrectUser(LogInRequest request)
        {
            return _context.Users.Any(x => x.Email == request.Email && x.Password == request.Password);
        }

        public string GetUserPasswordByEmail(string email)
        {
            return _context.Users.FirstOrDefault(x => x.Email.Equals(email))?.Password ?? "Usuario no encontrado";
        }

        public int? GetUserId(string email)
        {
            return _context.Users.FirstOrDefault(x => x.Email.Equals(email))?.UserId;
        }

        public bool StoreSession(Session session)
        {
            try
            {
                _context.Sessions.Add(session);
                int result = _context.SaveChanges();

                return result > 0;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public bool LogOut(string token)
        {
            var user = _context.Sessions.FirstOrDefault(x => x.Token == token);
            if (user == null)
                return false;

            user.Ended = DateTime.Now;
            _context.SaveChanges();

            return true;
        }

        public string GetTokenById(int userId)
        {
            return _context.Sessions.First(x => x.UserId == userId).Token ?? string.Empty;
        }

        public bool SaveRecoveryCode(int userId, string code, string email)
        {
            try
            {
                _context.RecoverCodes.Add(new RecoverCode
                {
                    UserId = userId,
                    RecoveryCode = code,
                    Email = email,
                    CreatedCode = DateTime.Now
                });
                int result = _context.SaveChanges();

                return result > 0;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public bool VerifyRecoveryCode(VerifyRecoverPasswordRequest request)
        {
            return _context.RecoverCodes.Any(x => x.Email == request.Email && x.RecoveryCode == request.RecoveryCode);
        }

        public bool ResetPassword(ResetPasswordRequest request)
        {
            try
            {
                var user = _context.Users.SingleOrDefault(x => x.Email == request.Email);

                if (user == null) return false;

                user.Password = request.Password;

                int result = _context.SaveChanges();

                return result > 0;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public bool ValidToken(string token)
        {
            try
            {
                return _context.Sessions.Any(s => s.Token == token && s.Ended == null);
            }
            catch (Exception)
            {
                return false;
            }
        }

        public bool UserExistsById(int userId)
        {
            try
            {
                return _context.Users.Any(s => s.UserId == userId);
            }
            catch (Exception)
            {
                return false;
            }
        }

        public bool AddProduct(AgregarProductoDTO producto)
        {
            try
            {
                var productoMap = new Productos
                {
                    Nombre = producto.Nombre,
                    Descripcion = producto.Descripcion,
                    Precio = producto.Precio,
                    FechaPublicacion = producto.FechaPublicacion,
                    UserId = producto.UserId,
                    CategoriaId = producto.Categoria,
                    ImagenUrl = producto.ImagenUrl,
                    EstadoId = producto.Estado
                };
                _context.Productos.Add(productoMap);
                int result = _context.SaveChanges();

                return result > 0;
            }
            catch (Exception)
            {
                return false;
            }
        }
        public List<ProductoDTO> GetProductosByUserId(int userId)
        {
            try
            {
                return _context.Productos
                    .Where(p => p.UserId == userId)
                    .Select(p => new ProductoDTO
                    {
                        ProductoId = p.ProductoId,
                        Nombre = p.Nombre,
                        Descripcion = p.Descripcion,
                        Precio = p.Precio,
                        FechaPublicacion = p.FechaPublicacion,
                        Categoria = p.CategoriaId,
                        ImagenUrl = p.ImagenUrl,
                        UserId = p.UserId,
                        UserNombre = p.User.Name,
                        UserCiudad = p.User.City,
                        Estado = p.Estado.EstadoId,
                        Comprado = _context.ProductosCompra.Any(pc => pc.ProductoId == p.ProductoId)
                    })
                    .ToList();
            }
            catch (Exception)
            {
                return new List<ProductoDTO>();
            }
        }

        public List<ProductoDTO> GetRandomProductos()
        {
            try
            {
                return _context.Productos
                    .Where(p => !_context.ProductosCompra.Any(pc => pc.ProductoId == p.ProductoId))
                    .OrderBy(p => Guid.NewGuid())
                    .Take(12)
                    .Select(p => new ProductoDTO
                    {
                        ProductoId = p.ProductoId,
                        Nombre = p.Nombre,
                        Descripcion = p.Descripcion,
                        Precio = p.Precio,
                        FechaPublicacion = p.FechaPublicacion,
                        Categoria = p.CategoriaId,
                        ImagenUrl = p.ImagenUrl,
                        UserId = p.UserId,
                        UserNombre = p.User.Name,
                        UserCiudad = p.User.City,
                        Estado = p.Estado.EstadoId,
                    })
                    .ToList();
            }
            catch (Exception)
            {
                return new List<ProductoDTO>();
            }
        }

        public List<CategoriaDTO> GetAllCategorias()
        {
            return _context.Categorias.Select(p => new CategoriaDTO
            {
                CategoriaId = p.CategoriaId,
                Nombre = p.Nombre,
            }).ToList();
        }

        public List<UserProductsDTO> GetRandomProductosUsers()
        {
            var usuariosValidos = _context.Users
                .Where(u => u.Productos.Count(p => !_context.ProductosCompra.Any(pc => pc.ProductoId == p.ProductoId)) >= 8)
                .ToList();

            if (usuariosValidos.Count < 2)
                return new List<UserProductsDTO>();

            var random = new Random();
            var usuariosSeleccionados = usuariosValidos
                .OrderBy(_ => random.Next())
                .Take(2)
                .ToList();

            var resultado = new List<UserProductsDTO>();

            foreach (var user in usuariosSeleccionados)
            {
                var productos = _context.Productos
                    .Where(p => p.UserId == user.UserId && !_context.ProductosCompra.Any(pc => pc.ProductoId == p.ProductoId))
                    .Select(p => new ProductoResumenDTO
                    {
                        ProductoId = p.ProductoId,
                        Nombre = p.Nombre,
                        ImagenUrl = p.ImagenUrl,
                    })
                    .ToList();

                resultado.Add(new UserProductsDTO
                {
                    UserId = user.UserId,
                    Nombre = user.Name,
                    Foto = user.ImageBase64 ?? "",
                    Productos = productos
                });
            }

            return resultado;
        }

        public ProductoDTO? GetProductosByProductoId(int productoId)
        {
            try
            {
                return _context.Productos
                    .Where(p => p.ProductoId == productoId)
                    .Select(p => new ProductoDTO
                    {
                        ProductoId = p.ProductoId,
                        Nombre = p.Nombre,
                        Descripcion = p.Descripcion,
                        Precio = p.Precio,
                        FechaPublicacion = p.FechaPublicacion,
                        Categoria = p.CategoriaId,
                        ImagenUrl = p.ImagenUrl,
                        UserId = p.UserId,
                        UserNombre = p.User.Name,
                        UserCiudad = p.User.City,
                        Estado = p.Estado.EstadoId
                    })
                    .FirstOrDefault();
            }
            catch (Exception)
            {
                return null;
            }
        }

        public List<EstadoDTO> GetAllEstados()
        {
            return _context.Estados.Select(p => new EstadoDTO
            {
                EstadoId = p.EstadoId,
                Nombre = p.Nombre,
            }).ToList();
        }

        public List<ProductoDTO> GetProductosByCategoria(int categoriaId)
        {
            try
            {
                return _context.Productos
                    .Where(p => p.CategoriaId == categoriaId)
                    .OrderBy(p => Guid.NewGuid())
                    .Take(12)
                    .Select(p => new ProductoDTO
                    {
                        ProductoId = p.ProductoId,
                        Nombre = p.Nombre,
                        Descripcion = p.Descripcion,
                        Precio = p.Precio,
                        FechaPublicacion = p.FechaPublicacion,
                        Categoria = p.CategoriaId,
                        ImagenUrl = p.ImagenUrl,
                        UserId = p.UserId,
                        UserNombre = p.User.Name,
                        UserCiudad = p.User.City,
                        Estado = p.Estado.EstadoId
                    }).ToList();
            }
            catch (Exception)
            {
                return new List<ProductoDTO>();
            }
        }

        public List<ProductoDTO> GetSearchedProducts(string query)
        {
            try
            {
                var queryLower = query.ToLower();
                var resultados = _context.Productos
                    .Where(p => !_context.ProductosCompra.Any(pc => pc.ProductoId == p.ProductoId) && p.Nombre.ToLower().StartsWith(queryLower))
                    .Take(10)
                    .Select(p => new ProductoDTO
                    {
                        ProductoId = p.ProductoId,
                        Nombre = p.Nombre,
                        Descripcion = p.Descripcion,
                        Precio = p.Precio,
                        FechaPublicacion = p.FechaPublicacion,
                        Categoria = p.CategoriaId,
                        ImagenUrl = p.ImagenUrl,
                        UserId = p.UserId,
                        UserNombre = p.User.Name,
                        UserCiudad = p.User.City,
                        Estado = p.Estado.EstadoId,
                        Comprado = _context.ProductosCompra.Any(pc => pc.ProductoId == p.ProductoId)
                    })
                    .ToList();

                if (!resultados.Any())
                {
                    resultados = _context.Productos
                        .Where(p => !_context.ProductosCompra.Any(pc => pc.ProductoId == p.ProductoId) && p.Nombre.ToLower().Contains(queryLower))
                        .Take(10)
                        .Select(p => new ProductoDTO
                        {
                            ProductoId = p.ProductoId,
                            Nombre = p.Nombre,
                            Descripcion = p.Descripcion,
                            Precio = p.Precio,
                            FechaPublicacion = p.FechaPublicacion,
                            Categoria = p.CategoriaId,
                            ImagenUrl = p.ImagenUrl,
                            UserId = p.UserId,
                            UserNombre = p.User.Name,
                            UserCiudad = p.User.City,
                            Estado = p.Estado.EstadoId,
                            Comprado = _context.ProductosCompra.Any(pc => pc.ProductoId == p.ProductoId)
                        })
                        .ToList();
                }

                return resultados;
            }
            catch (Exception)
            {
                return new List<ProductoDTO>();
            }
        }

        public Compra CrearCompra(CrearCompraDto crearCompra)
        {
            var numeroDePedido = $"TYD-{new Random().Next(100000, 999999)}";
            var compra = new Compra
            {
                UserId = crearCompra.UserId,
                FechaCompra = DateTime.UtcNow,
                DireccionEnvio = crearCompra.DireccionEnvio,
                CiudadEnvio = crearCompra.Ciudad,
                CodigoPostal = crearCompra.CodigoPostal,
                Pais = crearCompra.Pais,
                Email = crearCompra.Email,
                EstadoCompra = "Pagada",
                Total = crearCompra.Total,
                NumeroPedido = numeroDePedido,
                ProductosCompra = crearCompra.ProductoIds.Select(pid => new ProductoCompra
                {
                    ProductoId = pid
                }).ToList()
            };

            _context.Compras.Add(compra);
            _context.SaveChanges();

            return compra;
        }
        public bool UpdateUserProfile(UpdateProfileDto profileDto)
        {
            try
            {
                var user = _context.Users.FirstOrDefault(u => u.UserId == profileDto.UserId);
                if (user == null) return false;

                if (profileDto.Name != null)
                    user.Name = profileDto.Name;

                if (profileDto.Email != null)
                    user.Email = profileDto.Email;

                if (profileDto.BirthDate != null)
                    user.BirthDate = profileDto.BirthDate;

                if (profileDto.City != null)
                    user.City = profileDto.City;

                if (profileDto.Dni != null)
                    user.DNI = profileDto.Dni;

                if (profileDto.Password != null)
                    user.Password = profileDto.Password;

                if (profileDto.ImageBase64 != null)
                    user.ImageBase64 = profileDto.ImageBase64;

                _context.Users.Update(user);
                return _context.SaveChanges() > 0;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public Conversacion CrearConversacion(int compradorId, int vendedorId)
        {
            var compradorExiste = _context.Users.Any(u => u.UserId == compradorId);
            var vendedorExiste = _context.Users.Any(u => u.UserId == vendedorId);

            if (!compradorExiste || !vendedorExiste)
            {
                throw new Exception("Comprador o vendedor no existen.");
            }

            var existente = _context.Conversaciones
                .FirstOrDefault(c => c.CompradorId == compradorId && c.VendedorId == vendedorId);

            if (existente != null)
                return existente;

            var conversacion = new Conversacion
            {
                CompradorId = compradorId,
                VendedorId = vendedorId,
                FechaCreacion = DateTime.UtcNow
            };

            _context.Conversaciones.Add(conversacion);
            _context.SaveChanges();

            return conversacion;
        }


        public List<ConversacionDto> ObtenerConversacionesDeUsuario(int userId)
        {
            return _context.Conversaciones
                .Include(c => c.Comprador)
                .Include(c => c.Vendedor)
                .Where(c => c.CompradorId == userId || c.VendedorId == userId)
                .OrderByDescending(c => c.FechaCreacion)
                .Select(c => new ConversacionDto
                {
                    ConversacionId = c.ConversacionId,
                    CompradorId = c.CompradorId,
                    VendedorId = c.VendedorId,
                    FechaCreacion = c.FechaCreacion,
                    UltimoMensaje = c.Mensajes
                        .OrderByDescending(m => m.FechaEnvio)
                        .Select(m => new MensajeDto
                        {
                            MensajeId = m.MensajeId,
                            Contenido = m.Contenido,
                            FechaEnvio = m.FechaEnvio,
                            RemitenteId = m.RemitenteId
                        })
                        .FirstOrDefault(),

                    OtroUsuario = c.CompradorId == userId
                        ? new UsuarioDto
                        {
                            UserId = c.Vendedor.UserId,
                            Nombre = c.Vendedor.Name,
                            ImagenUrl = c.Vendedor.ImageBase64
                        }
                        : new UsuarioDto
                        {
                            UserId = c.Comprador.UserId,
                            Nombre = c.Comprador.Name,
                            ImagenUrl = c.Comprador.ImageBase64
                        }
                })
                .ToList();
        }

        public Conversacion? ObtenerConversacionConMensajes(int conversacionId, int userId)
        {
            return _context.Conversaciones
                .Include(c => c.Mensajes.OrderBy(m => m.FechaEnvio))
                .FirstOrDefault(c => c.ConversacionId == conversacionId &&
                                     (c.CompradorId == userId || c.VendedorId == userId));
        }

        public Mensaje EnviarMensaje(int remitenteId, int conversacionId, string contenido)
        {
            var mensaje = new Mensaje
            {
                ConversacionId = conversacionId,
                RemitenteId = remitenteId,
                Contenido = contenido,
                FechaEnvio = DateTime.UtcNow,
                Leido = false
            };

            _context.Mensajes.Add(mensaje);
            _context.SaveChanges();

            return mensaje;
        }

        public bool EliminarConversacion(int conversacionId, int userId)
        {
            var conversacion = _context.Conversaciones.FirstOrDefault(c =>
                c.ConversacionId == conversacionId &&
                (c.CompradorId == userId || c.VendedorId == userId));

            if (conversacion == null)
                return false;

            _context.Conversaciones.Remove(conversacion);
            _context.SaveChanges();
            return true;
        }

        public Conversacion? ObtenerConversacionExistente(int userId1, int userId2)
        {
            return _context.Conversaciones.FirstOrDefault(c => (c.CompradorId == userId1 && c.VendedorId == userId2) || (c.CompradorId == userId2 && c.VendedorId == userId1));
        }

        public bool EliminarMensaje(int mensajeId)
        {
            var mensaje = _context.Mensajes.FirstOrDefault(c => c.MensajeId == mensajeId);

            if (mensaje == null)
                return false;

            _context.Mensajes.Remove(mensaje);
            _context.SaveChanges();
            return true;
        }

        public int ObtenerConversacionIdPorMensajeId(int mensajeId)
        {
            return _context.Mensajes.FirstOrDefault(c => c.MensajeId == mensajeId).ConversacionId;
        }

        public bool EditarMensaje(int mensajeId, EditarMensajeDto dto)
        {
            var mensaje = _context.Mensajes.FirstOrDefault(c => c.MensajeId == mensajeId);

            if (mensaje == null)
                return false;

            mensaje.Contenido = dto.Contenido;
            _context.SaveChanges();
            return true;
        }

        public bool EditProduct(ProductoDTO producto)
        {
            var productoToEdit = _context.Productos.FirstOrDefault(c => c.ProductoId == producto.ProductoId);

            if (productoToEdit == null)
                return false;

            productoToEdit.Nombre = producto.Nombre;
            productoToEdit.Descripcion = producto.Descripcion;
            productoToEdit.Precio = producto.Precio;
            productoToEdit.FechaPublicacion = producto.FechaPublicacion;
            productoToEdit.ImagenUrl = producto.ImagenUrl;
            productoToEdit.CategoriaId = producto.Categoria;
            productoToEdit.EstadoId = producto.Estado;

            _context.SaveChanges();
            return true;
        }

        public bool DeleteProduct(int productId)
        {
            var producto = _context.Productos.FirstOrDefault(c => c.ProductoId == productId);

            if (producto == null)
                return false;

            _context.Productos.Remove(producto);
            _context.SaveChanges();
            return true;
        }
    }
}
