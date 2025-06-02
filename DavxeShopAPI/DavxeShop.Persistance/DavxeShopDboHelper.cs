using DavxeShop.Models.dbModels;
using DavxeShop.Models.models;
using DavxeShop.Models.Request.User;
using DavxeShop.Models.Response;
using DavxeShop.Persistance.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Globalization;

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

        public ProductoDTO? GetProductosByProductoId(int productoId, int loggedUserId)
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
                        Estado = p.Estado.EstadoId,
                        Favorito = _context.Favoritos.Any(f => f.ProductoId == productoId && f.UserId == loggedUserId),
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

        public bool AddFavorito(FavoritoDTO favoritoDto)
        {
            bool existe = _context.Favoritos.Any(f => f.UserId == favoritoDto.UserId && f.ProductoId == favoritoDto.ProductoId);

            if (existe)
                return false;

            var favorito = new Favorito
            {
                UserId = favoritoDto.UserId,
                ProductoId = favoritoDto.ProductoId,
                FechaCreacion = DateTime.Now
            };

            _context.Favoritos.Add(favorito);
            _context.SaveChanges();
            return true;
        }

        public bool DeleteFavorito(int userId, int productoId)
        {
            var favorito = _context.Favoritos.FirstOrDefault(f => f.UserId == userId && f.ProductoId == productoId);

            if (favorito == null)
                return false;

            _context.Favoritos.Remove(favorito);
            _context.SaveChanges();
            return true;
        }

        public List<ProductoDTO> GetFavoritUsersProducts(int userId)
        {
            try
            {
                return (from p in _context.Productos
                        join f in _context.Favoritos on p.ProductoId equals f.ProductoId
                        where f.UserId == userId
                        select new ProductoDTO
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
                        }).ToList();
            }
            catch (Exception)
            {
                return new List<ProductoDTO>();
            }
        }

        public ContraOfertaResponseDto EnviarContraOferta(int userId, ContraOfertaDto dto)
        {
            if (dto.PrecioContraOferta <= 0)
                return null;

            var producto = GetProductosByProductoId(dto.ProductoId, userId);
            if (producto == null)
                return null;

            var contraOfertaData = new
            {
                Comentario = dto.Comentario,
                PrecioContraOferta = dto.PrecioContraOferta,
                ProductoId = producto.ProductoId,
                ProductoNombre = producto.Nombre,
                ProductoFotoUrl = producto.ImagenUrl
            };

            string contenidoJson = System.Text.Json.JsonSerializer.Serialize(contraOfertaData);

            var mensaje = new Mensaje
            {
                ConversacionId = dto.ConversacionId,
                RemitenteId = userId,
                Contenido = contenidoJson,
                FechaEnvio = DateTime.UtcNow,
                Leido = false
            };

            _context.Mensajes.Add(mensaje);
            _context.SaveChanges();

            return new ContraOfertaResponseDto
            {
                MensajeId = mensaje.MensajeId,
                ConversacionId = mensaje.ConversacionId,
                RemitenteId = mensaje.RemitenteId,
                PrecioContraOferta = dto.PrecioContraOferta,
                Comentario = dto.Comentario,
                FechaEnvio = mensaje.FechaEnvio,
                Leido = mensaje.Leido,
                ProductoId = producto.ProductoId,
                ProductoNombre = producto.Nombre,
                ProductoFotoUrl = producto.ImagenUrl
            };
        }

        public DashboardUsuariosDto GetUsersData()
        {
            var now = DateTime.UtcNow;
            var hace30Dias = now.AddDays(-30);
            var hace60Dias = now.AddDays(-60);

            var totalUsers = _context.Users.Count();
            var prevTotalUsers = _context.Users.Count(u => u.BirthDate < hace30Dias);
            int totalUsersTrend = CompareTrend(totalUsers, prevTotalUsers);

            var newUsers = _context.Users.Count(u => u.BirthDate >= hace30Dias);
            var prevNewUsers = _context.Users.Count(u => u.BirthDate >= hace60Dias && u.BirthDate < hace30Dias);
            int newUsersTrend = CompareTrend(newUsers, prevNewUsers);

            var activeUsers = _context.Sessions
                .Where(s => s.Started >= hace30Dias)
                .Select(s => s.UserId)
                .Distinct()
                .Count();

            var prevActiveUsers = _context.Sessions
                .Where(s => s.Started >= hace60Dias && s.Started < hace30Dias)
                .Select(s => s.UserId)
                .Distinct()
                .Count();

            int activeUsersTrend = CompareTrend(activeUsers, prevActiveUsers);

            var usersByCity = _context.Users
                .GroupBy(u => u.City)
                .Select(g => new { City = g.Key ?? "Sin ciudad", Count = g.Count() })
                .ToDictionary(g => g.City, g => g.Count);

            var prevCities = _context.Users
                .Where(u => u.BirthDate >= hace60Dias && u.BirthDate < hace30Dias)
                .Select(u => u.City ?? "Sin ciudad")
                .Distinct()
                .ToHashSet();

            var currentCities = usersByCity.Keys;

            var usersByCityTrend = currentCities.ToDictionary(
                ciudad => ciudad,
                ciudad => !prevCities.Contains(ciudad)
            );

            var usersUltimas4Semanas = _context.Users
                .Where(u => u.BirthDate >= now.AddDays(-28))
                .ToList();

            var agrupadoPorSemana = usersUltimas4Semanas
                .GroupBy(u => System.Globalization.CultureInfo.InvariantCulture.Calendar.GetWeekOfYear(
                    u.BirthDate,
                    System.Globalization.CalendarWeekRule.FirstDay,
                    DayOfWeek.Monday))
                .OrderBy(g => g.Key)
                .Select(g => new
                {
                    Semana = "Semana " + g.Key,
                    Cantidad = g.Count()
                })
                .ToList();

            return new DashboardUsuariosDto
            {
                TotalUsers = totalUsers,
                TotalUsersTrend = totalUsersTrend,
                NewUsers = newUsers,
                NewUsersTrend = newUsersTrend,
                ActiveUsers = activeUsers,
                ActiveUsersTrend = activeUsersTrend,
                UsersByCity = usersByCity,
                UsersByCityTrend = usersByCityTrend,
                WeeklyActivity = new WeeklyActivityDto
                {
                    Labels = agrupadoPorSemana.Select(x => x.Semana).ToList(),
                    Data = agrupadoPorSemana.Select(x => x.Cantidad).ToList()
                }
            };
        }

        public ProductDashboardDto GetProductsData()
        {
            var now = DateTime.UtcNow;
            var hace30Dias = now.AddDays(-30);
            var hace60Dias = now.AddDays(-60);

            var total = _context.Productos.Count();
            var prevTotal = _context.Productos.Count(p => p.FechaPublicacion >= hace60Dias && p.FechaPublicacion < hace30Dias);
            int totalTrend = CompareTrend(total, prevTotal);

            var topSelling = _context.ProductosCompra.Sum(p => p.Cantidad);

            var prevTopSelling = _context.ProductosCompra
                .Where(pc => _context.Productos
                    .Where(p => p.FechaPublicacion >= hace60Dias && p.FechaPublicacion < hace30Dias)
                    .Select(p => p.ProductoId)
                    .Contains(pc.ProductoId))
                .GroupBy(p => p.ProductoId)
                .Select(g => g.Sum(x => x.Cantidad))
                .OrderByDescending(s => s)
                .FirstOrDefault();

            int topSellingTrend = CompareTrend(topSelling, prevTopSelling);

            var recent = _context.Productos.Count(p => p.FechaPublicacion >= hace30Dias);
            var prevRecent = _context.Productos.Count(p => p.FechaPublicacion >= hace60Dias && p.FechaPublicacion < hace30Dias);
            int recentTrend = CompareTrend(recent, prevRecent);

            var categories = _context.Productos.Where(p => p.CategoriaId != null).Select(p => p.CategoriaId).Distinct().Count();
            var prevCategories = _context.Productos
                .Where(p => p.FechaPublicacion >= hace60Dias && p.FechaPublicacion < hace30Dias && p.CategoriaId != null)
                .Select(p => p.CategoriaId)
                .Distinct()
                .Count();
            int categoriesTrend = CompareTrend(categories, prevCategories);

            var hace28Dias = now.AddDays(-28);
            var productosUltimas4Semanas = _context.Productos
                .Where(p => p.FechaPublicacion >= hace28Dias)
                .ToList();

            var agrupadoPorSemana = productosUltimas4Semanas
                .GroupBy(p => CultureInfo.InvariantCulture.Calendar.GetWeekOfYear(
                    p.FechaPublicacion,
                    CalendarWeekRule.FirstDay,
                    DayOfWeek.Monday))
                .OrderBy(g => g.Key)
                .Select(g => new
                {
                    Semana = "Semana " + g.Key,
                    Cantidad = g.Count()
                })
                .ToList();

            return new ProductDashboardDto
            {
                Total = total,
                TotalTrend = totalTrend,

                TopSelling = topSelling,
                TopSellingTrend = topSellingTrend,

                Recent = recent,
                RecentTrend = recentTrend,

                Categories = categories,
                CategoriesTrend = categoriesTrend,

                WeeklyActivity = new WeeklyActivityDto
                {
                    Labels = agrupadoPorSemana.Select(x => x.Semana).ToList(),
                    Data = agrupadoPorSemana.Select(x => x.Cantidad).ToList()
                }
            };
        }
        public ResumenVentasDto GetVentasData()
        {
            var hoy = DateTime.UtcNow;
            var inicioMesActual = new DateTime(hoy.Year, hoy.Month, 1);
            var inicioMesAnterior = inicioMesActual.AddMonths(-1);
            var finMesAnterior = inicioMesActual.AddDays(-1);

            var compras = _context.Compras.ToList();

            var comprasMesActual = compras.Where(c => c.FechaCompra >= inicioMesActual && c.FechaCompra <= hoy);
            var comprasMesAnterior = compras.Where(c => c.FechaCompra >= inicioMesAnterior && c.FechaCompra <= finMesAnterior);

            var ingresosTotales = compras.Sum(c => c.Total);
            var ingresosMesActual = comprasMesActual.Sum(c => c.Total);
            var ingresosMesAnterior = comprasMesAnterior.Sum(c => c.Total);

            var totalVentas = compras.Count();
            var totalVentasAnterior = comprasMesAnterior.Count();

            var promedioActual = totalVentas > 0 ? ingresosTotales / totalVentas : 0;
            var promedioAnterior = totalVentasAnterior > 0 ? ingresosMesAnterior / totalVentasAnterior : 0;

            var ventasPorSemana = compras
                .GroupBy(c => ISOWeek.GetWeekOfYear(c.FechaCompra))
                .Select(g => new VentaSemanalDto
                {
                    Semana = $"Semana {g.Key}",
                    TotalDinero = g.Sum(c => c.Total)
                })
                .OrderBy(v => v.Semana)
                .ToList();

            decimal CalcularTrend(decimal actual, decimal anterior)
            {
                return anterior == 0 ? 0 : ((actual - anterior) / anterior) * 100;
            }

            return new ResumenVentasDto
            {
                VentasMensuales = ingresosMesActual,
                VentasMensualesTrend = CalcularTrend(ingresosMesActual, ingresosMesAnterior),

                VentasTotales = ingresosTotales,
                VentasTotalesTrend = CalcularTrend(ingresosTotales, ingresosTotales - ingresosMesActual),

                Ingresos = ingresosTotales,
                IngresosTrend = CalcularTrend(ingresosMesActual, ingresosMesAnterior),

                PromedioPorVenta = promedioActual,
                PromedioPorVentaTrend = CalcularTrend(promedioActual, promedioAnterior),

                VentasSemanales = ventasPorSemana
            };
        }

        public ResumenChatResponse GetChatData()
        {
            var now = DateTime.UtcNow;

            var startCurrentMonth = new DateTime(now.Year, now.Month, 1);
            var startPreviousMonth = startCurrentMonth.AddMonths(-1);
            var startTwoMonthsAgo = startCurrentMonth.AddMonths(-2);

            int totalMessagesCurrent = _context.Mensajes.Count();
            int totalMessagesPrevious = _context.Mensajes
                .Count(m => m.FechaEnvio >= startTwoMonthsAgo && m.FechaEnvio < startPreviousMonth);

            int totalConversationsCurrent = _context.Conversaciones.Count();
            int totalConversationsPrevious = _context.Conversaciones
                .Count(c => c.FechaCreacion >= startTwoMonthsAgo && c.FechaCreacion < startPreviousMonth);

            var mensajesPorConversacion = _context.Mensajes
                .GroupBy(m => m.ConversacionId)
                .Select(g => new
                {
                    ConversacionId = g.Key,
                    MensajesCount = g.Count()
                }).ToList();

            int totalResponsesCurrent = _context.Mensajes.Count() - _context.Conversaciones.Count();

            int totalResponsesPrevious = _context.Mensajes
                .Where(m => m.FechaEnvio >= startTwoMonthsAgo && m.FechaEnvio < startPreviousMonth)
                .Count() - _context.Conversaciones
                    .Where(c => c.FechaCreacion >= startTwoMonthsAgo && c.FechaCreacion < startPreviousMonth)
                    .Count();

            int recentChatsCurrent = _context.Conversaciones.Count(c => c.FechaCreacion >= now.AddDays(-7));
            int recentChatsPrevious = _context.Conversaciones.Count(c => c.FechaCreacion >= now.AddDays(-14) && c.FechaCreacion < now.AddDays(-7));

            double CalculateTrend(int current, int previous)
            {
                if (previous == 0) return current > 0 ? 100 : 0;
                return ((double)(current - previous) / previous) * 100;
            }

            var weeklyActivity = _context.Mensajes
                .Where(m => m.FechaEnvio >= now.AddDays(-28))
                .AsEnumerable()
                .GroupBy(m => System.Globalization.CultureInfo.InvariantCulture.Calendar.GetWeekOfYear(
                    m.FechaEnvio,
                    System.Globalization.CalendarWeekRule.FirstFourDayWeek,
                    DayOfWeek.Monday))
                .Select(g => new SemanaActividad
                {
                    Semana = "Semana " + g.Key,
                    TotalMensajes = g.Count()
                })
                .OrderBy(sa => sa.Semana)
                .ToList();

            return new ResumenChatResponse
            {
                TotalMessages = totalMessagesCurrent,
                TotalMessagesTrend = CalculateTrend(totalMessagesCurrent, totalMessagesPrevious),

                TotalConversations = totalConversationsCurrent,
                TotalConversationsTrend = CalculateTrend(totalConversationsCurrent, totalConversationsPrevious),

                TotalResponses = totalResponsesCurrent,
                TotalResponsesTrend = CalculateTrend(totalResponsesCurrent, totalResponsesPrevious),

                RecentChats = recentChatsCurrent,
                RecentChatsTrend = CalculateTrend(recentChatsCurrent, recentChatsPrevious),

                WeeklyActivity = weeklyActivity
            };
        }

        private int CompareTrend(int current, int previous)
        {
            if (current > previous) return 1;
            if (current < previous) return -1;
            return 0;
        }
    }
}
